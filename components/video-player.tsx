"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react"

// Video data array - optimized for YouTube Shorts!
const videos = [
  {
    id: 1,
    title: "Student Interview #1",
    description: "Environmental awareness perspectives from UNAL students",
    // For YouTube Shorts, we'll use the direct link instead of embed
    youtubeUrl: "https://www.youtube.com/shorts/1aQVbnsUoZ4",
    thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_1/maxresdefault.jpg",
    type: "introduction",
  },
  {
    id: 2,
    title: "Trivia Activity #1",
    description: "First trivia competition done in the UNAL!",
    youtubeUrl: "https://youtube.com/shorts/Yk9fbxtGm8Y",
    thumbnail: "https://img.youtube.com/vi/Yk9fbxtGm8Y/maxresdefault.jpg",
    type: "trivia",
  },
  {
    id: 3,
    title: "Student Interview #1",
    description: "Discussion about consumption habits and environmental impact",
    youtubeUrl: "https://youtube.com/shorts/3BRzAaF0Kj0?feature=share",
    thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_3/maxresdefault.jpg",
    type: "interview",
  },
  {
    id: 4,
    title: "Student Interview #2",
    description: "Discussion about consumption habits and environmental impact",
    youtubeUrl: "https://youtube.com/shorts/TK0rimVUN0M?feature=share",
    thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_3/maxresdefault.jpg",
    type: "interview",
  },
  {
    id: 5,
    title: "Trivia Activity #2",
    description: "Trivia competition between UNAL students!",
    youtubeUrl: "https://youtube.com/shorts/hT2d0G2bmcs?feature=share",
    thumbnail: "https://img.youtube.com/vi/Yk9fbxtGm8Y/maxresdefault.jpg",
    type: "trivia",
  },
  {
    id: 6,
    title: "Student Interview #3",
    description: "Discussion about consumption habits and environmental impact",
    youtubeUrl: "https://youtube.com/shorts/Hu1TUidAsTw?feature=share",
    thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_3/maxresdefault.jpg",
    type: "interview",
  },
  {
    id: 7,
    title: "Student Interview #4",
    description: "Discussion about consumption habits and environmental impact",
    youtubeUrl: "https://youtube.com/shorts/mQRN0wPI68o?feature=share",
    thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_3/maxresdefault.jpg",
    type: "interview",
  },
  {
    id: 8,
    title: "Trivia Activity #3",
    description: "Trivia competition between UNAL students!",
    youtubeUrl: "https://youtube.com/shorts/QMMp4rWFXxA?feature=share",
    thumbnail: "https://img.youtube.com/vi/Yk9fbxtGm8Y/maxresdefault.jpg",
    type: "trivia",
  },
  {
    id: 9,
    title: "Student Interview #5",
    description: "Discussion about consumption habits and environmental impact",
    youtubeUrl: "https://youtube.com/shorts/oZp-Kgu5sUs?feature=share",
    thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_3/maxresdefault.jpg",
    type: "interview",
  },
  {
    id: 10,
    title: "Student Interview #6",
    description: "Discussion about consumption habits and environmental impact",
    youtubeUrl: "https://youtube.com/shorts/-B4Xbq2Qr7Y?feature=share",
    thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_3/maxresdefault.jpg",
    type: "interview",
  }
]

export function VideoPlayer() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const currentVideo = videos[currentVideoIndex]
  const isFirstVideo = currentVideoIndex === 0
  const isLastVideo = currentVideoIndex === videos.length - 1

  const goToNextVideo = () => {
    if (!isLastVideo) {
      setCurrentVideoIndex(currentVideoIndex + 1)
    }
  }

  const goToPrevVideo = () => {
    if (!isFirstVideo) {
      setCurrentVideoIndex(currentVideoIndex - 1)
    }
  }

  const goToVideo = (index: number) => {
    setCurrentVideoIndex(index)
  }

  const openInYouTube = () => {
    window.open(currentVideo.youtubeUrl, "_blank")
  }

  function extractVideoId(url: string) {
      const match = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/) || url.match(/v=([a-zA-Z0-9_-]+)/)
    return match ? match[1] : ""
  }


  return (
    <div className="space-y-6">
      {/* Main Video Display - Vertical for Shorts */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Video Preview */}
        <div className="flex-1 max-w-md mx-auto lg:mx-0">
          <Card className="overflow-hidden">
            <div className="relative">
              {/* Vertical Video Container for Shorts */}
              <div className="aspect-[9/16] bg-black relative rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${extractVideoId(currentVideo.youtubeUrl)}?rel=0&modestbranding=1`}
                  title={currentVideo.title}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* YouTube Shorts Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white">YouTube Shorts</Badge>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={goToPrevVideo}
                    disabled={isFirstVideo}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </div>

                <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={goToNextVideo}
                    disabled={isLastVideo}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Video Info */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant={currentVideo.type === "interview" ? "default" : "secondary"}>{currentVideo.type}</Badge>
              <span className="text-sm text-gray-500">
                {currentVideoIndex + 1} of {videos.length}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentVideo.title}</h3>
            <p className="text-gray-600 mb-4">{currentVideo.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={openInYouTube} className="w-full bg-red-600 hover:bg-red-700 text-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              Watch on YouTube
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={goToPrevVideo}
                disabled={isFirstVideo}
                className="flex-1 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={goToNextVideo}
                disabled={isLastVideo}
                className="flex-1 bg-transparent"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Video Stats */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">About this video</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Part of EcoIntervention UNAL project</p>
              <p>• Environmental awareness initiative</p>
              <p>• Universidad Nacional de Colombia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid - Vertical Thumbnails */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">All Videos</h4>
        <div className="space-y-3">
          {videos.map((video, index) => (
            <Card
              key={video.id}
              onClick={() => goToVideo(index)}
              className={`cursor-pointer p-4 flex flex-col gap-1 ${
                index === currentVideoIndex ? "ring-2 ring-green-500" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-base text-gray-900">{video.title}</h4>
                <Badge variant={video.type === "interview" ? "default" : "secondary"}>
                  {video.type}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{video.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
