import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { logEvent } from "../services/api";
import {
  benchmark,
  CLEARANCE_KEYS,
  formatGBP,
  Location,
  LOCATION_KEYS,
  ROLE_KEYS,
  RoleKey,
} from "../services/benchmarks";

function Picker<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {options.map((o) => (
            <Pressable
              key={o}
              onPress={() => onChange(o)}
              style={[styles.chip, value === o && styles.chipActive]}
            >
              <Text
                style={[
                  styles.chipText,
                  value === o && styles.chipTextActive,
                ]}
              >
                {o}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default function Salary() {
  const [role, setRole] = useState<RoleKey>("Systems Engineer");
  const [location, setLocation] = useState<Location>("Bristol");
  const [clearance, setClearance] = useState<string>("SC");

  const band = useMemo(
    () => benchmark(role, location, clearance),
    [role, location, clearance]
  );

  const check = () => {
    logEvent({
      eventType: "salary_check",
      consentScope: "salary_check",
      payload: { role, location, clearance, band },
    }).catch(() => {});
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Benchmark your salary</Text>
      <Text style={styles.body}>
        Indicative UK bands. Real benchmarking partner data is on the roadmap.
      </Text>

      <Picker
        label="Role"
        value={role}
        options={ROLE_KEYS}
        onChange={setRole}
      />
      <Picker
        label="Location"
        value={location}
        options={LOCATION_KEYS}
        onChange={setLocation}
      />
      <Picker
        label="Clearance"
        value={clearance}
        options={CLEARANCE_KEYS as string[]}
        onChange={setClearance}
      />

      <Pressable onPress={check} style={styles.cta}>
        <Text style={styles.ctaText}>Save check</Text>
      </Pressable>

      <View style={styles.result}>
        <Text style={styles.resultLabel}>Estimated salary band</Text>
        <View style={styles.bandRow}>
          <View style={styles.bandCol}>
            <Text style={styles.bandMin}>{formatGBP(band.min)}</Text>
            <Text style={styles.bandSub}>10th</Text>
          </View>
          <View style={styles.bandCol}>
            <Text style={styles.bandMedian}>{formatGBP(band.median)}</Text>
            <Text style={styles.bandSub}>median</Text>
          </View>
          <View style={styles.bandCol}>
            <Text style={styles.bandMax}>{formatGBP(band.max)}</Text>
            <Text style={styles.bandSub}>90th</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d2b2b" },
  content: { padding: 20, paddingBottom: 60 },
  heading: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 4 },
  body: { color: "#9bc0bd", fontSize: 13, marginBottom: 20 },
  label: { color: "#9bc0bd", marginBottom: 6, fontSize: 13 },
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
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  ctaText: { color: "#0d2b2b", fontWeight: "700" },
  result: {
    backgroundColor: "#14403f",
    padding: 18,
    borderRadius: 12,
  },
  resultLabel: { color: "#9bc0bd", marginBottom: 14 },
  bandRow: { flexDirection: "row", justifyContent: "space-between" },
  bandCol: { alignItems: "center", flex: 1 },
  bandMin: { color: "#5eead4", fontSize: 18, fontWeight: "700" },
  bandMedian: { color: "#fff", fontSize: 26, fontWeight: "800" },
  bandMax: { color: "#5eead4", fontSize: 18, fontWeight: "700" },
  bandSub: {
    color: "#7ba29e",
    fontSize: 11,
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
