"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    queryType: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <section className="px-6 py-8 md:py-16 bg-sky-frost/80">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-medium text-[#333333] mb-2">
            Love to hear from you,
            <br />
            Get in touch <Image src="/images/icons/hand.png" alt="heart" width={40} height={40} className="inline-block" />
          </h2>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name..."
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full md:rounded-xs"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email id"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full md:rounded-xs"
                required
              />
            </div>
          </div>

          {/* Query Type and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="queryType" className="block text-sm font-medium text-gray-700 mb-2">
                Query Type
              </label>
              <Select value={formData.queryType} onValueChange={(value) => handleInputChange("queryType", value)}>
                <SelectTrigger className="w-full md:rounded-xs">
                  <SelectValue placeholder="Select query type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="learn-basic-coding">Learn Basic Coding</SelectItem>
                  <SelectItem value="advanced-programming">Advanced Programming</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="mobile-development">Mobile Development</SelectItem>
                  <SelectItem value="ai-machine-learning">AI & Machine Learning</SelectItem>
                  <SelectItem value="career-guidance">Career Guidance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full md:rounded-xs"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="w-full min-h-32 resize-none md:rounded-xs"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" className="bg-aqua-mist hover:bg-aqua-depth text-white w-1/2 py-3 text-lg md:rounded-xs font-medium">
              Send message
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
