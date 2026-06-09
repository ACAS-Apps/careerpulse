import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const TILES = [
  {
    href: "/salary",
    title: "Salary check",
    blurb: "Benchmark your role by location & clearance.",
  },
  { href: "/cv", title: "CV score", blurb: "Instant feedback on your CV." },
  {
    href: "/jobs",
    title: "Job alerts",
    blurb: "Tell us what to watch — we'll ping you when it appears.",
  },
  {
    href: "/skills",
    title: "Skills gap",
    blurb: "See which skills are in shortest supply.",
  },
];

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>CareerPulse</Text>
      <Text style={styles.subtitle}>
        Career intelligence for defence, aerospace & engineering professionals.
      </Text>

      <Link href="/consent" style={styles.primaryCta}>
        Get started
      </Link>

      <Text style={styles.sectionLabel}>Tools</Text>

      {TILES.map((t) => (
        <Link key={t.href} href={t.href as any} style={styles.tile}>
          <View>
            <Text style={styles.tileTitle}>{t.title}</Text>
            <Text style={styles.tileBlurb}>{t.blurb}</Text>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d2b2b" },
  content: { padding: 22, paddingBottom: 60 },
  title: { color: "#fff", fontSize: 34, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#9bc0bd", fontSize: 15, marginBottom: 24 },
  primaryCta: {
    backgroundColor: "#5eead4",
    color: "#0d2b2b",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 28,
    overflow: "hidden",
  },
  sectionLabel: {
    color: "#9bc0bd",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  tile: {
    backgroundColor: "#14403f",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    color: "#fff",
  },
  tileTitle: { color: "#fff", fontWeight: "700", fontSize: 16, marginBottom: 4 },
  tileBlurb: { color: "#9bc0bd", fontSize: 13 },
});
