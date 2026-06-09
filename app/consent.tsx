import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { grantConsent, POLICY_VERSION } from "../services/api";

type Scope = {
  key: string;
  label: string;
  description: string;
  required: boolean;
};

const SCOPES: Scope[] = [
  {
    key: "salary_check",
    label: "Salary lookups",
    description:
      "The role / location / clearance you check. Used to show benchmarks.",
    required: true,
  },
  {
    key: "cv_upload",
    label: "CV scoring",
    description:
      "We score your CV on-device. Only the score signals are sent — not the full text. (Encrypted-server scoring is on the roadmap.)",
    required: false,
  },
  {
    key: "job_alert",
    label: "Job alerts",
    description: "Skills, sectors and locations you want to be alerted about.",
    required: false,
  },
  {
    key: "skills_search",
    label: "Skills research",
    description: "Which skills you look up in the skills-gap tool.",
    required: false,
  },
  {
    key: "analytics_aggregate",
    label: "Anonymised hiring-market reports",
    description:
      "Opt-in. Your data is anonymised and combined with others before being included in commercial intelligence products sold to recruiters and defence primes.",
    required: false,
  },
];

export default function Consent() {
  const [granted, setGranted] = useState<Record<string, boolean>>({
    salary_check: true,
    cv_upload: false,
    job_alert: false,
    skills_search: true,
    analytics_aggregate: false,
  });

  const toggle = (k: string, v: boolean) =>
    setGranted((g) => ({ ...g, [k]: v }));

  const submit = async () => {
    try {
      for (const s of SCOPES) {
        if (granted[s.key]) await grantConsent(s.key);
      }
      router.push("/salary");
    } catch (e: unknown) {
      Alert.alert(
        "Could not save consent",
        e instanceof Error ? e.message : "Unknown error"
      );
    }
  };

  const canSubmit = SCOPES.every((s) => !s.required || granted[s.key]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>What we collect, with your consent</Text>
      <Text style={styles.body}>
        UK & EU GDPR-aligned. Policy version {POLICY_VERSION}. Change any of
        these any time.
      </Text>

      {SCOPES.map((s) => (
        <View key={s.key} style={styles.row}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.rowTitle}>
              {s.label}{" "}
              {s.required ? <Text style={styles.req}>(required)</Text> : null}
            </Text>
            <Text style={styles.rowDesc}>{s.description}</Text>
          </View>
          <Switch
            value={granted[s.key]}
            onValueChange={(v) => toggle(s.key, v)}
            disabled={s.required}
          />
        </View>
      ))}

      <Pressable
        onPress={submit}
        style={[styles.cta, !canSubmit && styles.ctaDisabled]}
        disabled={!canSubmit}
      >
        <Text style={styles.ctaText}>Continue</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d2b2b" },
  content: { padding: 20, paddingBottom: 60 },
  heading: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 8 },
  body: { color: "#9bc0bd", marginBottom: 24, lineHeight: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#14403f",
  },
  rowTitle: { color: "#fff", fontWeight: "600", marginBottom: 4 },
  rowDesc: { color: "#7ba29e", fontSize: 13 },
  req: { color: "#5eead4", fontSize: 12 },
  cta: {
    backgroundColor: "#5eead4",
    padding: 14,
    borderRadius: 10,
    marginTop: 28,
    alignItems: "center",
  },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: "#0d2b2b", fontWeight: "700", fontSize: 16 },
});
