import { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { logEvent } from "../services/api";

type JobAlert = { id: string; skills: string; location: string; sector: string };

export default function Jobs() {
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [sector, setSector] = useState("Defence");
  const [alerts, setAlerts] = useState<JobAlert[]>([]);

  const save = async () => {
    if (!skills.trim()) {
      Alert.alert("Add at least one skill");
      return;
    }
    const a: JobAlert = {
      id: String(Date.now()),
      skills,
      location,
      sector,
    };
    setAlerts((cur) => [a, ...cur]);
    try {
      await logEvent({
        eventType: "job_alert_create",
        consentScope: "job_alert",
        payload: { skills, location, sector },
      });
    } catch {
      Alert.alert(
        "Couldn't sync alert",
        "Enable 'Job alerts' in your consent settings to receive notifications."
      );
    }
    setSkills("");
    setLocation("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a job alert</Text>
      <Text style={styles.body}>
        Tell us what you want to be alerted about — we'll watch the market.
      </Text>

      <TextInput
        value={skills}
        onChangeText={setSkills}
        placeholder="Skills (e.g. MBSE, DOORS, Python)"
        placeholderTextColor="#7ba29e"
        style={styles.input}
      />
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Location (e.g. Bristol)"
        placeholderTextColor="#7ba29e"
        style={styles.input}
      />
      <View style={{ flexDirection: "row", gap: 6, marginBottom: 10 }}>
        {["Defence", "Aerospace", "Engineering", "Cyber"].map((s) => (
          <Pressable
            key={s}
            onPress={() => setSector(s)}
            style={[styles.chip, sector === s && styles.chipActive]}
          >
            <Text
              style={[styles.chipText, sector === s && styles.chipTextActive]}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={save} style={styles.cta}>
        <Text style={styles.ctaText}>Save alert</Text>
      </Pressable>

      <Text style={styles.subheading}>Your alerts</Text>
      <FlatList
        data={alerts}
        keyExtractor={(a) => a.id}
        renderItem={({ item }) => (
          <View style={styles.alertRow}>
            <Text style={styles.alertSkills}>{item.skills}</Text>
            <Text style={styles.alertMeta}>
              {[item.sector, item.location].filter(Boolean).join(" · ")}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No alerts yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d2b2b", padding: 20 },
  heading: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 4 },
  body: { color: "#9bc0bd", fontSize: 13, marginBottom: 14 },
  subheading: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#14403f",
    color: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 15,
    marginBottom: 10,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#14403f",
  },
  chipActive: { backgroundColor: "#5eead4" },
  chipText: { color: "#9bc0bd", fontSize: 13 },
  chipTextActive: { color: "#0d2b2b", fontWeight: "700" },
  cta: {
    backgroundColor: "#5eead4",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  ctaText: { color: "#0d2b2b", fontWeight: "700" },
  alertRow: {
    backgroundColor: "#14403f",
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  alertSkills: { color: "#fff", fontSize: 15, fontWeight: "600" },
  alertMeta: { color: "#9bc0bd", fontSize: 13, marginTop: 4 },
  empty: { color: "#7ba29e", fontStyle: "italic" },
});
