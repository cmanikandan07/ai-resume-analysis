import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function SkillGapChart({ data }) {
  const chartData =
    data.skill_gap?.missing_skills?.map((s) => ({
      name: s,
      value: 1,
    })) || [];

  return (
    <BarChart width={400} height={300} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="value" />
    </BarChart>
  );
}