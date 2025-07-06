  "use client"

  import { useState, useEffect } from "react"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  import { Label } from "@/components/ui/label"
  import {
    Droplets,
    Recycle,
    Zap,
    TreePine,
    Globe,
    Trophy,
    CheckCircle,
    XCircle,
  } from "lucide-react"
  import { Wheel } from "react-custom-roulette"

  const getFeedbackMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage === 100) return "🌟 Perfect score! You're an eco expert!"
    if (percentage >= 80) return "🎉 Great job! You really know your stuff!"
    if (percentage >= 50) return "👍 Not bad! Keep learning and growing."
    return "🌱 Every expert starts somewhere. Keep it up!"
  }

  const triviaCategories = [
    {
      id: "recycling",
      name: "Recycling & Waste",
      icon: Recycle,
      color: "bg-green-500",
      questions: [
        {
          question: "How long does it take for a plastic bottle to decompose in nature?",
          options: ["50 years", "100 years", "450 years", "1000 years"],
          correct: 2,
          explanation: "A plastic bottle can take up to 450 years to decompose — and in many cases, it doesn’t fully disappear but turns into microplastics that pollute water and food chains. That’s why reducing plastic use is so important.",
        },
        {
          question: "What percentage of plastic waste is actually recycled globally?",
          options: ["Less than 10%", "About 25%", "Around 50%", "Over 75%"],
          correct: 0,
          explanation: "Less than 10% of plastic waste is recycled. Most ends up in landfills or the ocean, contributing to massive environmental damage.",
        },
        {
          question: "Which material can be recycled indefinitely without losing quality?",
          options: ["Paper", "Plastic", "Glass", "Cardboard"],
          correct: 2,
          explanation: "Glass can be recycled endlessly without losing purity or quality. Recycling glass also saves energy and raw materials.",
        },
        {
          question: "Which of these materials takes the longest to break down?",
          options: ["Paper", "Plastic bottle", "Banana peel", "Aluminum can"],
          correct: 1,
          explanation: "Plastic bottles can take between 400 to 1,000 years to decompose. Unlike biodegradable materials, plastic persists and accumulates, harming ecosystems.",
        },
        {
          question: "What does the rule of the 3 R’s stand for?",
          options: ["Reduce, Reuse, Recycle", "Repair, Recycle, Reflect", "Collect, Reason, Reuse", "Cut, Reuse, Restore"],
          correct: 0,
          explanation: "The 3 R’s—Reduce, Reuse, Recycle—guide us to consume less, repurpose items, and properly recycle to reduce waste. It’s the eco-warrior’s mantra! 🌱♻️",
        },
      ],
    },
    {
      id: "water",
      name: "Water Conservation",
      icon: Droplets,
      color: "bg-blue-500",
      questions: [
        {
          question: "How much water does a 5-minute shower typically use?",
          options: ["25 liters", "50 liters", "75 liters", "100 liters"],
          correct: 2,
          explanation: "A short 5-minute shower can use up to 75 liters of water! Reducing shower time can save both water and energy.",
        },
        {
          question: "What percentage of Earth's water is fresh water available for human use?",
          options: ["Less than 1%", "About 3%", "Around 10%", "Nearly 25%"],
          correct: 0,
          explanation: "Although 70% of Earth is water, only about 3% is fresh water—and less than 1% is accessible for human use. It’s an extremely limited resource!",
        },
        {
          question: "Which activity uses the most water in an average household?",
          options: ["Cooking", "Showering", "Toilet flushing", "Laundry"],
          correct: 1,
          explanation: "Showering typically uses the most water in households. Simple actions like installing low-flow showerheads can make a big difference.",
        },
        {
          question: "Approximately what percentage of Earth's water is fresh and accessible for human consumption?",
          options: ["10%", "2.5%", "1%", "20%"],
          correct: 2,
          explanation: "Only about 1% of the Earth’s water is both fresh and accessible. Most is locked in ice caps or underground, making conservation crucial.",
        },
      ],
    },
    {
      id: "energy",
      name: "Energy & Climate",
      icon: Zap,
      color: "bg-yellow-500",
      questions: [
        {
          question: "Which renewable energy source is the fastest growing globally?",
          options: ["Wind power", "Solar power", "Hydroelectric", "Geothermal"],
          correct: 1,
          explanation: "Solar power is rapidly expanding as costs drop and technology improves. It’s leading the transition to cleaner energy worldwide.",
        },
        {
          question: "How much energy can you save by switching to LED light bulbs?",
          options: ["25%", "50%", "75%", "90%"],
          correct: 2,
          explanation: "LED bulbs use about 75% less energy than incandescent bulbs and last much longer—saving money and reducing carbon emissions.",
        },
        {
          question: "What is the main cause of climate change?",
          options: ["Natural cycles", "Solar radiation", "Greenhouse gases", "Ocean currents"],
          correct: 2,
          explanation: "Greenhouse gases, particularly CO₂ from fossil fuel use, trap heat in the atmosphere and are the main driver of global warming.",
        },
        {
          question: "What is the greenhouse effect?",
          options: [
            "The natural warming of Earth by certain gases",
            "An agricultural technique",
            "A phenomenon that cools the planet",
            "A type of farming greenhouse",
          ],
          correct: 0,
          explanation: "The greenhouse effect is natural and essential, but human activities have intensified it by releasing excess CO₂, causing global warming. 🌍🔥",
        },
        {
          question: "Which of these gases is a major contributor to climate change?",
          options: ["Oxygen", "Nitrogen", "Carbon dioxide (CO₂)", "Helium"],
          correct: 2,
          explanation: "CO₂ is released when we burn fossil fuels. While naturally present in the atmosphere, excessive levels trap heat and accelerate climate change.",
        },
      ],
    },
    {
      id: "biodiversity",
      name: "Nature & Wildlife",
      icon: TreePine,
      color: "bg-emerald-500",
      questions: [
        {
          question: "How many species go extinct every day due to human activities?",
          options: ["1-5 species", "10-50 species", "100-200 species", "Over 1000 species"],
          correct: 2,
          explanation: "Experts estimate that 100–200 species go extinct daily, mostly due to habitat loss, pollution, and climate change. We are in a biodiversity crisis.",
        },
        {
          question: "What percentage of the Amazon rainforest has been deforested?",
          options: ["5%", "10%", "17%", "25%"],
          correct: 2,
          explanation: "Around 17% of the Amazon has been lost to deforestation, threatening ecosystems and contributing to global climate issues.",
        },
        {
          question: "Which ecosystem produces the most oxygen on Earth?",
          options: ["Rainforests", "Oceans", "Grasslands", "Forests"],
          correct: 1,
          explanation: "Oceans produce about 70% of Earth’s oxygen, thanks to microscopic organisms like phytoplankton. Protecting marine life is vital for life on Earth.",
        },
        {
          question: "What is an ecosystem?",
          options: [
            "A type of medicinal plant",
            "A scientific social network",
            "A community of living things and their environment",
            "A legally protected area",
          ],
          correct: 2,
          explanation: "An ecosystem is where plants, animals, and the environment interact. Damaging any part of it can disrupt the whole balance. 🐝🌳",
        },
      ],
    },
    {
      id: "sustainable",
      name: "Sustainable Living",
      icon: Globe,
      color: "bg-purple-500",
      questions: [
        {
          question: "What is the most effective way to reduce your carbon footprint?",
          options: ["Recycling more", "Using public transport", "Eating less meat", "Buying local products"],
          correct: 2,
          explanation: "Eating less meat, especially red meat, significantly reduces greenhouse gas emissions and environmental impact.",
        },
        {
          question: "How much food is wasted globally each year?",
          options: ["10%", "20%", "33%", "50%"],
          correct: 2,
          explanation: "About 1/3 of all food produced globally is wasted. Reducing food waste can ease hunger and save resources.",
        },
        {
          question: "What does 'carbon neutral' mean?",
          options: [
            "Using no carbon",
            "Balancing carbon emissions with removal",
            "Reducing carbon by 50%",
            "Using only renewable energy",
          ],
          correct: 1,
          explanation: "Being carbon neutral means offsetting your emissions by removing or compensating for the same amount elsewhere—like planting trees or supporting green energy.",
        },
      ],
    },
  ];


  const wheelData = triviaCategories.map((c) => ({ option: c.name }))

  export default function EnhancedTrivia() {
    const [isClient, setIsClient] = useState(false)
    const [mustSpin, setMustSpin] = useState(false)
    const [prizeNumber, setPrizeNumber] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [showExplanation, setShowExplanation] = useState(false)
    const [quizComplete, setQuizComplete] = useState(false)
    const [answered, setAnswered] = useState(false)

    useEffect(() => {
      setIsClient(true)
    }, [])

    const spinWheel = () => {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
      setSelectedCategory(null)
      setQuestionIndex(0)
      setSelectedAnswer(null)
      setScore(0)
      setShowExplanation(false)
      setQuizComplete(false)
      setAnswered(false)
    }

    const handleStopSpinning = () => {
      setMustSpin(false)
      setSelectedCategory(triviaCategories[prizeNumber])
    }

    const currentQuestion = selectedCategory?.questions?.[questionIndex]

    const handleAnswer = (index: number) => {
      if (answered) return
      setSelectedAnswer(index)
      setAnswered(true)
      setShowExplanation(true)
      if (index === currentQuestion.correct) {
        setScore((prev) => prev + 1)
      }
    }

    const handleNextQuestion = () => {
      const nextIndex = questionIndex + 1
      if (nextIndex < selectedCategory.questions.length) {
        setQuestionIndex(nextIndex)
        setSelectedAnswer(null)
        setAnswered(false)
        setShowExplanation(false)
      } else {
        setQuizComplete(true)
      }
    }

    if (!isClient) return null

    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Spin the Environmental Wheel</h1>

        <div className="flex justify-center mb-4">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={wheelData}
            outerBorderColor="#34d399"
            outerBorderWidth={8}
            innerBorderColor="#fff"
            radiusLineColor="#fff"
            radiusLineWidth={2}
            fontSize={18}
            perpendicularText
            backgroundColors={["#228B22", "#0077BE", "#8B4513", "#0A2342", "#708090"]}
            textColors={["#ffffff"]}
            onStopSpinning={handleStopSpinning}
          />
        </div>

        <Button onClick={spinWheel} disabled={mustSpin} className="text-lg py-4 px-8 mb-4">
          {mustSpin ? "Spinning..." : "🎰 Spin Now!"}
        </Button>

        {selectedCategory && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow">
            <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center">
              <selectedCategory.icon className="mr-2 h-8 w-8 text-green-600" />
              {selectedCategory.name}
            </h2>

            {quizComplete ? (
              <div className="text-center">
                <Trophy className="mx-auto mb-2 h-12 w-12 text-yellow-500" />
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  You got {score} out of {selectedCategory.questions.length} correct!
                </p>
                <p className="text-gray-600">
                  {getFeedbackMessage(score, selectedCategory.questions.length)}
                </p>
              </div>
            ) : currentQuestion ? (
              <Card className="text-left mt-4">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Q{questionIndex + 1}: {currentQuestion.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <RadioGroup>
                    {currentQuestion.options.map((opt: string, i: number) => (
                      <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem
                          id={`q${questionIndex}-opt${i}`}
                          value={opt}
                          onClick={() => handleAnswer(i)}
                          disabled={answered}
                          className={
                            answered && i === currentQuestion.correct
                              ? "border-green-600"
                              : answered && selectedAnswer === i && i !== currentQuestion.correct
                              ? "border-red-600"
                              : ""
                          }
                        />
                        <Label htmlFor={`q${questionIndex}-opt${i}`}>
                          {opt}
                          {answered && i === currentQuestion.correct && (
                            <CheckCircle className="inline ml-2 h-4 w-4 text-green-600" />
                          )}
                          {answered && selectedAnswer === i && i !== currentQuestion.correct && (
                            <XCircle className="inline ml-2 h-4 w-4 text-red-600" />
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {showExplanation && (
                    <div className="text-sm text-gray-500 italic mt-2">
                      💡 {currentQuestion.explanation}
                    </div>
                  )}
                  {answered && showExplanation && (
                    <Button className="mt-4" onClick={handleNextQuestion}>
                      {questionIndex < selectedCategory.questions.length - 1
                        ? "Next Question"
                        : "See Results"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : null}
          </div>
        )}
      </div>
    )
  }
