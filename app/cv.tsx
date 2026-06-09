import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { logEvent } from "../services/api";
import { CvScore, scoreCv } from "../services/cv";

export default function CvScreen() {
  const [text, setText] = useState("");
  const [score, setScore] = useState<CvScore | null>(null);

  const run = async () => {
    const s = scoreCv(text);
    setScore(s);
    // Only send breakdown + suggestions to the backend — never the raw CV text.
    logEvent({
      eventType: "cv_score",
      consentScope: "cv_upload",
      payload: {
        total: s.total,
        breakdown: s.breakdown,
        suggestion_count: s.suggestions.length,
        word_count: text.trim().split(/\s+/).filter(Boolean).length,
      },
    }).catch(() => {
      // Likely 403: user hasn't granted cv_upload. UX continues — score is on-device.
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Score your CV</Text>
      <Text style={styles.body}>
        Paste your CV text below. Scoring runs on-device — only the score, not
        the text, leaves your phone.
      </Text>

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={10}
        placeholder="Paste CV text here…"
        placeholderTextColor="#7ba29e"
        value={text}
        onChangeText={setText}
      />

      <Pressable
        style={[styles.cta, !text.trim() && styles.ctaDisabled]}
        onPress={run}
        disabled={!text.trim()}
      >
        <Text style={styles.ctaText}>Score</Text>
      </Pressable>

      {score && (
        <View style={styles.result}>
          <Text style={styles.scoreNumber}>{score.total}/100</Text>
          <View style={styles.bars}>
            <Bar label="Length" value={score.breakdown.length} max={25} />
            <Bar label="Keywords" value={score.breakdown.keywords} max={25} />
            <Bar label="Metrics" value={score.breakdown.metrics} max={25} />
            <Bar label="Structure" value={score.breakdown.structure} max={25} />
          </View>
          {score.suggestions.length > 0 && (
            <View style={{ marginTop: 16 }}>
              <Text style={styles.suggestionsHeading}>Suggestions</Text>
              {score.suggestions.map((s, i) => (
                <Text key={i} style={styles.suggestion}>
                  • {s}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

function Bar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.barLabel}>{label}</Text>
        <Text style={styles.barValue}>
          {value}/{max}
        </Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d2b2b" },
  content: { padding: 20, paddingBottom: 60 },
  heading: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 4 },
  body: { color: "#9bc0bd", fontSize: 13, marginBottom: 16 },
  input: {
    backgroundColor: "#14403f",
    color: "#fff",
    minHeight: 180,
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    textAlignVertical: "top",
  },
  cta: {
    backgroundColor: "#5eead4",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 14,
  },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: "#0d2b2b", fontWeight: "700" },
  result: {
    backgroundColor: "#14403f",
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
  },
  scoreNumber: {
    color: "#5eead4",
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
  },
  bars: { marginTop: 4 },
  barLabel: { color: "#9bc0bd", fontSize: 13 },
  barValue: { color: "#fff", fontSize: 13, fontWeight: "600" },
  barTrack: {
    height: 6,
    backgroundColor: "#0d2b2b",
    borderRadius: 3,
    marginTop: 4,
    overflow: "hidden",
  },
  barFill: { height: 6, backgroundColor: "#5eead4" },
  suggestionsHeading: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 6,
  },
  suggestion: { color: "#9bc0bd", fontSize: 13, marginBottom: 4 },
});
