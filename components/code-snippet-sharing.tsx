'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Code, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

interface CodeSnippet {
  id: string
  title: string
  description: string
  language: string
  code: string
  githubUrl?: string
}

const codeSnippets: CodeSnippet[] = [
  {
    id: 'image-processing',
    title: 'Image Processing with OpenCV',
    description: 'Core image processing function used in the Image to Sketch project',
    language: 'python',
    code: `import cv2
import numpy as np

def sketch_image(image_path):
    # Read the image
    img = cv2.imread(image_path)
    
    # Convert to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian blur
    blurred = cv2.GaussianBlur(gray_img, (5, 5), 0)
    
    # Detect edges using Canny
    edges = cv2.Canny(blurred, 10, 70)
    
    # Invert the image
    ret, mask = cv2.threshold(edges, 70, 255, cv2.THRESH_BINARY_INV)
    
    return mask

# Example usage
# result = sketch_image('path/to/image.jpg')
# cv2.imwrite('output_sketch.jpg', result)`,
    githubUrl: 'https://github.com/Kedhareswer/MLGeneFunction'
  },
  {
    id: 'digit-classifier',
    title: 'Digit Classification Model',
    description: 'Neural network model for digit classification using TensorFlow',
    language: 'python',
    code: `import tensorflow as tf
from tensorflow.keras import layers, models

def create_digit_classifier():
    model = models.Sequential([
        # Reshape input to 28x28x1
        layers.Reshape((28, 28, 1), input_shape=(784,)),
        
        # Convolutional layers
        layers.Conv2D(32, kernel_size=(3, 3), activation='relu'),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Conv2D(64, kernel_size=(3, 3), activation='relu'),
        layers.MaxPooling2D(pool_size=(2, 2)),
        
        # Flatten and dense layers
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(10, activation='softmax')
    ])
    
    # Compile the model
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

# Create and train the model
# model = create_digit_classifier()
# model.fit(x_train, y_train, epochs=5, validation_data=(x_test, y_test))`,
    githubUrl: 'https://github.com/Kedhareswer/Digit_Classifier_DeepLearning'
  },
  {
    id: 'medical-image',
    title: 'Medical Image Enhancement',
    description: 'Core algorithm for enhancing endoscopy images',
    language: 'python',
    code: `import cv2
import numpy as np
from skimage import exposure

def enhance_medical_image(image_path):
    # Read the image
    img = cv2.imread(image_path)
    
    # Convert to LAB color space
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    
    # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    
    # Merge the CLAHE enhanced L-channel with the original A and B channels
    merged = cv2.merge((cl, a, b))
    
    # Convert back to BGR color space
    enhanced = cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)
    
    # Apply additional sharpening
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    sharpened = cv2.filter2D(enhanced, -1, kernel)
    
    return sharpened

# Example usage
# result = enhance_medical_image('path/to/endoscopy_image.jpg')
# cv2.imwrite('enhanced_image.jpg', result)`,
    githubUrl: 'https://github.com/Kedhareswer/endoscopy-enhancement'
  }
]

export default function CodeSnippetSharing() {
  const [activeSnippet, setActiveSnippet] = useState<CodeSnippet>(codeSnippets[0])
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeSnippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium mb-6 flex items-center">
        <Code className="mr-2 h-5 w-5" />
        Code Snippet Sharing
      </h3>
      
      <Tabs 
        defaultValue={codeSnippets[0].id} 
        value={activeSnippet.id}
        onValueChange={(value) => {
          const snippet = codeSnippets.find(s => s.id === value)
          if (snippet) setActiveSnippet(snippet)
        }}
        className="w-full"
      >
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${codeSnippets.length}, 1fr)` }}>
          {codeSnippets.map((snippet) => (
            <TabsTrigger key={snippet.id} value={snippet.id}>
              {snippet.title.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {codeSnippets.map((snippet) => (
          <TabsContent key={snippet.id} value={snippet.id} className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <h4 className="text-lg font-medium">{snippet.title}</h4>
                <p className="text-gray-600 text-sm">{snippet.description}</p>
              </div>
              
              <Card className="relative bg-gray-900 text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  
                  {snippet.githubUrl && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={() => window.open(snippet.githubUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <pre className="whitespace-pre-wrap">
                  <code>{snippet.code}</code>
                </pre>
              </Card>
              
              <div className="mt-4 flex justify-end">
                {snippet.githubUrl && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => window.open(snippet.githubUrl, '_blank')}
                  >
                    <Github className="h-3 w-3 mr-1" />
                    View on GitHub
                  </Button>
                )}
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function Github(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}
