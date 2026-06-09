import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { logEvent } from "../services/api";

type Skill = { name: string; shortage: number; trend: "up" | "flat" | "down" };

// Placeholder market-shortage signals — replace with backend-served data.
const SKILLS: Skill[] = [
  { name: "MBSE / Cameo", shortage: 92, trend: "up" },
  { name: "DV-cleared software", shortage: 88, trend: "up" },
  { name: "Mission-critical Rust", shortage: 81, trend: "up" },
  { name: "DOORS / requirements", shortage: 75, trend: "flat" },
  { name: "AS9100 quality", shortage: 70, trend: "flat" },
  { name: "PCB / RF design", shortage: 78, trend: "up" },
  { name: "Cyber GRC (NIST)", shortage: 85, trend: "up" },
  { name: "MATLAB / Simulink", shortage: 64, trend: "flat" },
  { name: "Data engineering (AWS)", shortage: 73, trend: "up" },
  { name: "Embedded C/C++", shortage: 80, trend: "flat" },
];

export default function Skills() {
  const [selected, setSelected] = useState<string | null>(null);

  const onTap = (s: Skill) => {
    setSelected(s.name);
    logEvent({
      eventType: "skill_view",
      consentScope: "skills_search",
      payload: { skill: s.name, shortage: s.shortage, trend: s.trend },
    }).catch(() => {});
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>UK skills-gap signals</Text>
      <Text style={styles.body}>
        Higher shortage = harder to hire = stronger leverage when you negotiate.
      </Text>

      {SKILLS.map((s) => (
        <Pressable
          key={s.name}
          onPress={() => onTap(s)}
          style={[styles.row, selected === s.name && styles.rowActive]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.rowName}>{s.name}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${s.shortage}%` }]} />
            </View>
          </View>
          <Text style={styles.rowValue}>
            {s.shortage}
            <Text style={styles.rowTrend}>
              {" "}
              {s.trend === "up" ? "↑" : s.trend === "down" ? "↓" : "→"}
            </Text>
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d2b2b" },
  content: { padding: 20, paddingBottom: 60 },
  heading: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 4 },
  body: { color: "#9bc0bd", fontSize: 13, marginBottom: 18 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#14403f",
    marginBottom: 8,
  },
  rowActive: { backgroundColor: "#1d5b59" },
  rowName: { color: "#fff", fontSize: 15, marginBottom: 6 },
  barTrack: {
    height: 5,
    backgroundColor: "#0d2b2b",
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: { height: 5, backgroundColor: "#5eead4" },
  rowValue: {
    color: "#5eead4",
    fontWeight: "800",
    fontSize: 18,
    marginLeft: 12,
    minWidth: 50,
    textAlign: "right",
  },
  rowTrend: { color: "#9bc0bd", fontWeight: "400" },
});
