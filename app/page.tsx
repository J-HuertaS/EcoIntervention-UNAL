"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  Users,
  BarChart3,
  Globe,
  BookOpen,
  CheckCircle,
  Loader2,
  RefreshCw,
  Recycle,
  Download,
} from "lucide-react"
import { parseCSV, analyzeData } from "@/lib/csv-parser"
import { CommentSection } from "@/components/comment-section"
import { VideoPlayer } from "@/components/video-player"
import dynamic from 'next/dynamic'

// Importa el componente de forma dinámica SIN SSR
const EnhancedTrivia = dynamic(() => import('@/components/enhanced-trivia'), {
  ssr: false,
})

export default function EcointerventionUNAL() {
  const [surveyData, setSurveyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  // Load and analyze CSV data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async (silent = false) => {
    if (!silent) setLoading(true)

    try {
      console.log("📁 Loading survey data from static CSV...")
      const response = await fetch("/data/ECOWEEK.csv")

      if (!response.ok) {
        throw new Error(`Failed to load CSV: ${response.status}`)
      }

      const csvText = await response.text()
      console.log("✅ Successfully loaded CSV data")
      console.log("📊 CSV Preview:", csvText.substring(0, 200) + "...")

      const parsedData = parseCSV(csvText)
      const analysis = analyzeData(parsedData)
      setSurveyData(analysis)
      setLastUpdated(new Date())

      console.log("📈 Analysis complete:", {
        totalResponses: analysis.totalResponses,
        categories: Object.keys(analysis),
      })
    } catch (error) {
      console.error("❌ Error loading CSV data:", error)
    } finally {
      if (!silent) setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    try {
      await loadData()
    } finally {
      setRefreshing(false)
    }
  }

  // Helper function to get percentage
  const getPercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0
  }

  // Helper function to get top environmental issues
  const getTopEnvironmentalIssues = () => {
    if (!surveyData?.environmentalIssues) return []

    return Object.entries(surveyData.environmentalIssues)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 3)
      .map(([issue, count]) => ({
        issue,
        count: count as number,
        percentage: getPercentage(count as number, surveyData.totalResponses),
      }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl text-gray-900">EcoIntervention UNAL</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">
                Home
              </a>
              <a href="#statistics" className="text-gray-700 hover:text-green-600 transition-colors">
                Statistics
              </a>
              <a href="#videos" className="text-gray-700 hover:text-green-600 transition-colors">
                Videos
              </a>
              <a href="#trivia" className="text-gray-700 hover:text-green-600 transition-colors">
                Trivia
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            Universidad Nacional de Colombia
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">EcoIntervention UNAL</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">Reflecting on how we consume</p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Promoting responsible consumption and environmental awareness among university students through an
            innovative Ecological Week that combines education, action, and community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#about-us">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <BookOpen className="mr-2 h-5 w-5" /> 
              Learn More
              </Button>
            </a>
            
            
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open(process.env.NEXT_PUBLIC_SURVEY_URL, "_blank")}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Take Our Survey
            </Button>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="about-us" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Addressing overconsumption and promoting sustainable practices within the university community.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Targeting students aged 18-28 to foster environmental consciousness and responsible behavior.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Recycle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Sustainable Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Implementing workshops, conferences, and eco-fairs to promote reusing and conscious consumption.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Status & Future Plans Section */}
      <section id="journey" className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey So Far</h2>
            <p className="text-lg text-gray-600">Building the foundation for environmental change at UNAL</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We've Done</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Student Surveys & Research</h4>
                    <p className="text-gray-600">
                      Collected valuable data from university students to understand current environmental awareness and
                      consumption habits.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Interactive Activities</h4>
                    <p className="text-gray-600">
                      Organized engaging activities and interviews to help students reflect on their environmental
                      impact and consumption patterns.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Community Insights</h4>
                    <p className="text-gray-600">
                      Gained deep understanding of student perspectives and willingness to participate in environmental
                      initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision for the Future</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Globe className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Environmental Conferences</h4>
                    <p className="text-gray-600">
                      Expert-led sessions on sustainability, climate change, and responsible consumption practices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Campus-Wide Events</h4>
                    <p className="text-gray-600">
                      Large-scale eco-fairs, workshops, and community engagement activities throughout the university.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Recycle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Full Ecological Week</h4>
                    <p className="text-gray-600">
                      A comprehensive week-long program combining education, action, and community building for maximum
                      impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md justify-center">
                <h4 className="font-bold text-gray-900 mb-3">We Need Your Support!</h4>
                <p className="text-gray-600 mb-4">
                  To make our vision a reality, we need to ensure we have strong community backing. Your participation
                  in our surveys and feedback helps us demonstrate the demand for these initiatives.
                </p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(process.env.NEXT_PUBLIC_SURVEY_URL, "_blank")}
                >
                  Help Us Build Support - Take the Survey
                </Button>
          </div>
        </div>
        
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Survey Results</h2>
            </div>
            <p className="text-lg text-gray-600">Real data from our environmental awareness survey</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              <span className="ml-2 text-gray-600">Loading survey data...</span>
            </div>
          ) : surveyData ? (
            <>
              {/* Key Metrics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-green-600">{surveyData.totalResponses}</CardTitle>
                    <CardDescription>Total Survey Responses</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-blue-600">
                      {getPercentage(surveyData.containerWillingness?.["Yes"] || 0, surveyData.totalResponses)}%
                    </CardTitle>
                    <CardDescription>Would Bring Own Container</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-purple-600">
                      {getPercentage(
                        (surveyData.recyclingStats?.["Always"] || 0),
                        surveyData.totalResponses,
                      )}
                      %
                    </CardTitle>
                    <CardDescription>Recycle Regularly</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-orange-600">
                      {getPercentage(
                        (surveyData.paymentWillingness?.["Yes"] || 0) +
                          (surveyData.paymentWillingness?.["I'm not sure"] || 0),
                        surveyData.totalResponses,
                      )}
                      %
                    </CardTitle>
                    <CardDescription>Open to Eco-Friendly Products</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Detailed Charts */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Recycle className="mr-2 h-5 w-5" />
                      Recycling Frequency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(surveyData.recyclingStats || {}).map(([frequency, count]) => (
                      <div key={frequency}>
                        <div className="flex justify-between mb-2">
                          <span className="capitalize">{frequency}</span>
                          <span>{getPercentage(count as number, surveyData.totalResponses)}%</span>
                        </div>
                        <Progress value={getPercentage(count as number, surveyData.totalResponses)} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Transportation Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(surveyData.transportationStats || {}).map(([transport, count]) => (
                      <div key={transport}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">{transport}</span>
                          <span>{getPercentage(count as number, surveyData.totalResponses)}%</span>
                        </div>
                        <Progress value={getPercentage(count as number, surveyData.totalResponses)} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Add Water Conservation Chart */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="mr-2 h-5 w-5" />
                      Water Conservation Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(surveyData.waterConservationStats || {}).map(([practice, count]) => (
                      <div key={practice}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">{practice}</span>
                          <span>{getPercentage(count as number, surveyData.totalResponses)}%</span>
                        </div>
                        <Progress value={getPercentage(count as number, surveyData.totalResponses)} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Payment Willingness Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Willingness to Pay More for Eco-Friendly Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(surveyData.paymentWillingness || {}).map(([willingness, count]) => (
                      <div key={willingness}>
                        <div className="flex justify-between mb-2">
                          <span>{willingness}</span>
                          <span>{getPercentage(count as number, surveyData.totalResponses)}%</span>
                        </div>
                        <Progress value={getPercentage(count as number, surveyData.totalResponses)} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Environmental Issues */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-5 w-5" />
                    Top Environmental Concerns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {getTopEnvironmentalIssues().map(({ issue, count, percentage }, index) => (
                      <div key={issue} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-2">#{index + 1}</div>
                        <div className="font-semibold mb-1">{issue}</div>
                        <div className="text-sm text-gray-600">
                          {percentage}% ({count} responses)
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Unable to load survey data. Please try again later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Activities</h2>
            <p className="text-lg text-gray-600">
              Watch interviews and activities from our environmental awareness initiative
            </p>
          </div>

          <VideoPlayer />
        </div>
      </section>

      {/* Enhanced Trivia Section */}
      <section id="trivia" className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Environmental Trivia Challenge</h2>
            <p className="text-lg text-gray-600">
              Test your environmental knowledge across different categories - just like Trivia Crack!
            </p>
          </div>

          <EnhancedTrivia />
        </div>
      </section>

      {/* Comment Section */}
      <CommentSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="font-bold text-xl">EcoIntervention UNAL</span>
          </div>
          <p className="text-gray-400 mb-4">
            Promoting environmental awareness and responsible consumption at Universidad Nacional de Colombia
          </p>
          <p className="text-sm text-gray-500">
            © 2025 EcoIntervention UNAL. Part of the Intensive English I project with Professor Martin Suarez.
          </p>
        </div>
      </footer>
    </div>
  )
}
