import { useTheme } from "@nextui-org/react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

// rechart data
const data = [
  {
    day: "Mon",
    Ammount: 1,
  },
  {
    day: "Tue",
    Ammount: 3,
  },
  {
    day: "Wed",
    Ammount: 5,
  },
  {
    day: "Thu",
    Ammount: 1,
  },
  {
    day: "Fri",
    Ammount: 1,
  },
  {
    day: "Sat",
    Ammount: 2,
  },
  {
    day: "Sun",
    Ammount: 2,
  },
]

const WorkoutChart = () => {
  const {theme} = useTheme()
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.colors.secondary.value} stopOpacity={0.6} />
            <stop offset="95%" stopColor={theme.colors.secondary.value} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: theme.colors.secondary.value, fontSize: 11 }}
          interval={0}
          padding={{ left: 5, right: 5 }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Ammount"
          stroke={theme.colors.secondary.value}
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default WorkoutChart
