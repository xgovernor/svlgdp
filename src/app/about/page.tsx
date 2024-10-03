import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Layers, Satellite, Brain, Users, ArrowRight, MailIcon } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    { name: "Aisha Rahman", role: "Team Lead & GIS Specialist", image: "/placeholder.svg?height=100&width=100" },
    { name: "Rahul Choudhury", role: "Full-stack Developer", image: "/placeholder.svg?height=100&width=100" },
    { name: "Fatima Begum", role: "Data Scientist", image: "/placeholder.svg?height=100&width=100" },
    { name: "Mohammed Ali", role: "UI/UX Designer", image: "/placeholder.svg?height=100&width=100" },
    { name: "Priya Das", role: "Machine Learning Engineer", image: "/placeholder.svg?height=100&width=100" }
  ]

  const features = [
    { title: "Advanced Data Visualization", description: "Transform complex geospatial data into intuitive, interactive maps and charts.", icon: Layers },
    { title: "Real-time Satellite Integration", description: "Access and analyze up-to-date satellite imagery from various NASA missions.", icon: Satellite },
    { title: "AI-Powered Analysis", description: "Utilize machine learning algorithms to detect patterns and predict environmental changes.", icon: Brain },
    { title: "Collaborative Platform", description: "Share findings, collaborate on projects, and contribute to a global community of researchers.", icon: Users }
  ]

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 dark:bg-gray-100 dark:text-gray-900">
      <section className="mb-16 text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
          #NASASpaceApps
        </Badge>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl mb-6">
          GeoVision Explorer: Revolutionizing Geospatial Analysis
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Empowering researchers, policymakers, and citizens with cutting-edge geospatial insights
        </p>
        <Button size="lg">
          Explore Our Platform
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              GeoVision Explorer is a cutting-edge GIS platform developed for the NASA Space App Challenge. Our mission is to leverage geospatial data and advanced visualization techniques to address critical environmental and social challenges faced by our planet.
            </p>
            <p className="text-lg mb-4">
              Born from the innovative minds at Metropolitan University, Sylhet, our platform aims to bridge the gap between complex satellite data and actionable insights.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="GeoVision Explorer Platform"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Team</h2>
        <p className="max-w-2xl mx-auto text-center mb-12 text-lg text-gray-600">
          Meet the brilliant minds behind GeoVision Explorer. Our diverse team of experts from Metropolitan University, Sylhet, brings together a wealth of knowledge in GIS, software development, data science, and environmental studies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{member.role}</p>
              <div className="flex space-x-4">
                <Link href="#" aria-label={`${member.name}'s GitHub`} className="text-gray-600 hover:text-gray-900">
                  <Github className="w-5 h-5" />
                </Link>
                <Link href="#" aria-label={`${member.name}'s Twitter`} className="text-gray-600 hover:text-gray-900">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" aria-label={`${member.name}'s LinkedIn`} className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-16" />

      <section className="mb-16">
        <div className="bg-primary text-primary-foreground rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-4">NASA Space App Challenge</h2>
          <p className="text-lg mb-4">
            GeoVision Explorer was conceived and developed as part of the NASA Space App Challenge, a global hackathon that engages thousands of problem-solvers to address real-world challenges we face on Earth and in space.
          </p>
          <p className="text-lg mb-6">
            Our team&apos;s participation in this challenge has allowed us to collaborate with NASA and other space agencies, accessing cutting-edge data and technologies to create innovative solutions for global issues.
          </p>
          <Button variant="secondary">Learn More About the Challenge</Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Get in Touch</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-lg mb-6">
              We&apos;re always excited to collaborate, share insights, or answer any questions about GeoVision Explorer. Reach out to us at:
            </p>
            <ul className="list-disc list-inside text-lg mb-6 space-y-2">
              <li>Email: contact@geovisionexplorer.com</li>
              <li>Phone: +880 1234 567890</li>
              <li>Address: Metropolitan University, Bateshwar, Sylhet 3100, Bangladesh</li>
            </ul>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <MailIcon className="mr-2 h-4 w-4" /> Contact Us
              </Button>
              <Button>
                <ArrowRight className="mr-2 h-4 w-4" /> Join Our Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
