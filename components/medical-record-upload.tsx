"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Loader2 } from "lucide-react"
import { uploadMedicalRecord } from "@/actions/patient-records"
import { toast } from "@/hooks/use-toast"

interface MedicalRecordUploadProps {
  patientId: string
}

export function MedicalRecordUpload({ patientId }: MedicalRecordUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 200)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })
      formData.append("description", description)
      formData.append("patientId", patientId)

      await uploadMedicalRecord(formData)

      clearInterval(progressInterval)
      setUploadProgress(100)

      setTimeout(() => {
        toast({
          title: "Upload successful",
          description: `${files.length} file(s) uploaded successfully`,
          variant: "default",
        })
        setFiles([])
        setDescription("")
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
    } catch (error) {
      clearInterval(progressInterval)
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files",
        variant: "destructive",
      })
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Medical Records</CardTitle>
        <CardDescription>Upload medical documents, test results, or images to the patient's record</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="files">Select Files</Label>
            <div className="grid w-full items-center gap-1.5">
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="files"
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-5 text-center transition-colors hover:bg-slate-100"
                >
                  <FileUp className="h-10 w-10 text-slate-400" />
                  <div className="mt-2 text-sm text-slate-500">Drag and drop files here or click to browse</div>
                  <Input
                    id="files"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Selected files:</p>
                <ul className="mt-1 max-h-32 overflow-y-auto text-sm">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between py-1">
                      <span className="truncate">{file.name}</span>
                      <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a description for these files..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isUploading}
            />
          </div>
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Upload Progress</Label>
                <span className="text-xs font-medium">{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-slate-800 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setFiles([])
            setDescription("")
          }}
          disabled={isUploading || files.length === 0}
        >
          Clear
        </Button>
        <Button onClick={handleSubmit} disabled={isUploading || files.length === 0}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <FileUp className="mr-2 h-4 w-4" />
              Upload Files
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
