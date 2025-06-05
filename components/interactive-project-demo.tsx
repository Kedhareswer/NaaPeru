'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, RefreshCw, Upload, Download, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface ProjectDemo {
  id: string
  title: string
  description: string
  type: 'image-processing' | 'digit-recognition' | 'text-analysis'
  demoUrl?: string
}

const projectDemos: ProjectDemo[] = [
  {
    id: 'image-to-sketch',
    title: 'Image to Sketch Converter',
    description: 'Upload an image and convert it to a pencil sketch using deep learning',
    type: 'image-processing',
    demoUrl: 'https://image-to-sketch-wine.vercel.app/'
  },
  {
    id: 'digit-classifier',
    title: 'Digit Classifier',
    description: 'Draw a digit and the AI will recognize it in real-time',
    type: 'digit-recognition'
  },
  {
    id: 'text-analyzer',
    title: 'Text Sentiment Analyzer',
    description: 'Analyze the sentiment and key entities in any text input',
    type: 'text-analysis'
  }
]

export default function InteractiveProjectDemo() {
  const [activeDemo, setActiveDemo] = useState<ProjectDemo>(projectDemos[0])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [digit, setDigit] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [textResult, setTextResult] = useState<{sentiment: string, score: number, entities: string[]} | null>(null)
  const [intensityLevel, setIntensityLevel] = useState(50)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setResultImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = () => {
    if (!imagePreview) return
    
    setIsProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      // In a real implementation, this would call an API to process the image
      // For demo purposes, we're using a placeholder result image
      setResultImage('/projects/image-to-sketch-convert.png')
      setIsProcessing(false)
    }, 2000)
  }

  const resetDemo = () => {
    setImageFile(null)
    setImagePreview(null)
    setResultImage(null)
    setDigit(null)
    setText('')
    setTextResult(null)
  }

  const recognizeDigit = () => {
    // Simulate digit recognition
    setIsProcessing(true)
    setTimeout(() => {
      setDigit(Math.floor(Math.random() * 10).toString())
      setIsProcessing(false)
    }, 1500)
  }

  const analyzeText = () => {
    if (!text.trim()) return
    
    setIsProcessing(true)
    
    // Simulate text analysis
    setTimeout(() => {
      const sentiments = ['Positive', 'Negative', 'Neutral']
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
      const score = Math.random()
      const entities = ['Technology', 'Data Science', 'AI', 'Machine Learning'].filter(() => Math.random() > 0.5)
      
      setTextResult({
        sentiment,
        score,
        entities: entities.length ? entities : ['No entities detected']
      })
      
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium mb-6 flex items-center">
        <Play className="mr-2 h-5 w-5" />
        Interactive Project Demos
      </h3>
      
      <Tabs 
        defaultValue={projectDemos[0].id} 
        value={activeDemo.id}
        onValueChange={(value) => {
          const demo = projectDemos.find(d => d.id === value)
          if (demo) {
            setActiveDemo(demo)
            resetDemo()
          }
        }}
        className="w-full"
      >
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${projectDemos.length}, 1fr)` }}>
          {projectDemos.map((demo) => (
            <TabsTrigger key={demo.id} value={demo.id}>
              {demo.title.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* Image to Sketch Demo */}
        <TabsContent value="image-to-sketch" className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h4 className="text-lg font-medium">{activeDemo.title}</h4>
              <p className="text-gray-600 text-sm">{activeDemo.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 border border-gray-200">
                <h5 className="text-sm font-medium mb-3">Input Image</h5>
                
                {imagePreview ? (
                  <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-md flex flex-col items-center justify-center p-6">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 text-center mb-4">Upload an image to convert</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Select Image
                    </Button>
                    <input 
                      id="image-upload"
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
                
                {imagePreview && (
                  <div className="mt-4">
                    <div className="mb-3">
                      <label className="text-sm font-medium">Effect Intensity</label>
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className="mt-2"
                        onValueChange={(value) => setIntensityLevel(value[0])}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        Change Image
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1"
                        onClick={processImage}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : 'Convert to Sketch'}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
              
              <Card className="p-4 border border-gray-200">
                <h5 className="text-sm font-medium mb-3">Result</h5>
                
                {resultImage ? (
                  <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={resultImage} 
                      alt="Result" 
                      className="w-full h-full object-contain"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="absolute bottom-3 right-3"
                      onClick={() => {
                        // In a real implementation, this would download the processed image
                        const link = document.createElement('a')
                        link.href = resultImage
                        link.download = 'sketch-result.png'
                        link.click()
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-sm text-gray-500 text-center">
                      {isProcessing ? (
                        <span className="flex flex-col items-center">
                          <RefreshCw className="h-8 w-8 text-gray-400 mb-2 animate-spin" />
                          Processing image...
                        </span>
                      ) : 'Converted image will appear here'}
                    </p>
                  </div>
                )}
                
                {resultImage && (
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={resetDemo}
                    >
                      Start Over
                    </Button>
                  </div>
                )}
              </Card>
            </div>
            
            {activeDemo.demoUrl && (
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(activeDemo.demoUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Full Demo
                </Button>
              </div>
            )}
          </motion.div>
        </TabsContent>
        
        {/* Digit Classifier Demo */}
        <TabsContent value="digit-classifier" className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h4 className="text-lg font-medium">{activeDemo.title}</h4>
              <p className="text-gray-600 text-sm">{activeDemo.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 border border-gray-200">
                <h5 className="text-sm font-medium mb-3">Drawing Canvas</h5>
                
                <div className="aspect-square bg-black rounded-md flex flex-col items-center justify-center p-6">
                  <p className="text-sm text-gray-400 text-center mb-4">
                    Drawing canvas would be implemented here
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    onClick={recognizeDigit}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Recognizing...
                      </>
                    ) : 'Recognize Digit'}
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 border border-gray-200">
                <h5 className="text-sm font-medium mb-3">Recognition Result</h5>
                
                {digit ? (
                  <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Recognized Digit:</p>
                      <p className="text-7xl font-bold text-blue-600">{digit}</p>
                      <p className="text-sm text-gray-500 mt-4">Confidence: 98%</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-sm text-gray-500 text-center">
                      {isProcessing ? (
                        <span className="flex flex-col items-center">
                          <RefreshCw className="h-8 w-8 text-gray-400 mb-2 animate-spin" />
                          Analyzing...
                        </span>
                      ) : 'Recognition result will appear here'}
                    </p>
                  </div>
                )}
                
                {digit && (
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={resetDemo}
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </motion.div>
        </TabsContent>
        
        {/* Text Analysis Demo */}
        <TabsContent value="text-analyzer" className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h4 className="text-lg font-medium">{activeDemo.title}</h4>
              <p className="text-gray-600 text-sm">{activeDemo.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 border border-gray-200">
                <h5 className="text-sm font-medium mb-3">Text Input</h5>
                
                <textarea
                  className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter text to analyze sentiment and extract entities..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    size="sm"
                    onClick={analyzeText}
                    disabled={isProcessing || !text.trim()}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : 'Analyze Text'}
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 border border-gray-200">
                <h5 className="text-sm font-medium mb-3">Analysis Results</h5>
                
                {textResult ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h6 className="text-sm font-medium mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-1" />
                        Sentiment Analysis
                      </h6>
                      <div className="flex items-center">
                        <div className="w-24 text-sm font-medium">
                          {textResult.sentiment}
                        </div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${textResult.sentiment === 'Positive' ? 'bg-green-500' : textResult.sentiment === 'Negative' ? 'bg-red-500' : 'bg-yellow-500'}`}
                            style={{ width: `${textResult.score * 100}%` }}
                          />
                        </div>
                        <div className="w-12 text-right text-xs text-gray-500">
                          {Math.round(textResult.score * 100)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h6 className="text-sm font-medium mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-1" />
                        Entities Detected
                      </h6>
                      <div className="flex flex-wrap gap-2">
                        {textResult.entities.map((entity, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {entity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center">
                    <p className="text-sm text-gray-500 text-center">
                      {isProcessing ? (
                        <span className="flex flex-col items-center">
                          <RefreshCw className="h-8 w-8 text-gray-400 mb-2 animate-spin" />
                          Analyzing text...
                        </span>
                      ) : 'Analysis results will appear here'}
                    </p>
                  </div>
                )}
                
                {textResult && (
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={resetDemo}
                    >
                      Clear Results
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ExternalLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  )
}