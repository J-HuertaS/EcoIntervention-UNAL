export interface SurveyResponse {
  timestamp: string
  consent: string
  recyclingFrequency: string
  transportation: string
  waterConservation: string
  ecoFriendlyPayment: string
  environmentalIssues: string
  bringOwnContainer: string
  justification: string
}

export function parseCSV(csvText: string): SurveyResponse[] {
  const lines = csvText.split("\n")
  const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

  return lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = parseCSVLine(line)
      return {
        timestamp: values[0] || "",
        recyclingFrequency: values[1] || "",
        transportation: values[2] || "",
        waterConservation: values[3] || "",
        ecoFriendlyPayment: values[4] || "",
        environmentalIssues: values[5] || "",
        bringOwnContainer: values[6] || "",
        justification: values[7] || "",
        consent: values[8] || "",
      }
    })
}

function parseCSVLine(line: string): string[] {
  const result = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

// Update the analyzeData function to include water conservation analysis
export function analyzeData(responses: SurveyResponse[]) {
  const totalResponses = responses.length

  // Recycling frequency analysis
  const recyclingStats = responses.reduce(
    (acc, response) => {
      const freq = response.recyclingFrequency
      acc[freq] = (acc[freq] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Transportation analysis
  const transportationStats = responses.reduce(
    (acc, response) => {
      const transport = response.transportation
      acc[transport] = (acc[transport] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Eco-friendly payment willingness
  const paymentWillingness = responses.reduce(
    (acc, response) => {
      const willingness = response.ecoFriendlyPayment
      acc[willingness] = (acc[willingness] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Container bringing willingness
  const containerWillingness = responses.reduce(
    (acc, response) => {
      const willingness = response.bringOwnContainer
      acc[willingness] = (acc[willingness] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Water conservation practices (can be multiple per response)
  const waterConservationStats = responses.reduce(
    (acc, response) => {
      const practices = response.waterConservation.split(";").filter((practice) => practice.trim())
      practices.forEach((practice) => {
        const cleanPractice = practice.trim()
        acc[cleanPractice] = (acc[cleanPractice] || 0) + 1
      })
      return acc
    },
    {} as Record<string, number>,
  )

  // Environmental issues (can be multiple per response)
  const environmentalIssues = responses.reduce(
    (acc, response) => {
      const issues = response.environmentalIssues.split(";").filter((issue) => issue.trim())
      issues.forEach((issue) => {
        const cleanIssue = issue.trim()
        acc[cleanIssue] = (acc[cleanIssue] || 0) + 1
      })
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    totalResponses,
    recyclingStats,
    transportationStats,
    paymentWillingness,
    containerWillingness,
    waterConservationStats,
    environmentalIssues,
  }
}
