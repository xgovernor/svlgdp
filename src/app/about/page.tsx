import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Github, Linkedin, ArrowRight } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    { name: "G.M. Sifat Iqbal", role: "Team Lead", image: "/images/team/shifat.png", description: ["G.M. Sifat is an undergraduate student of Electrical and Electronic Engineering (EEE) with a strong passion for research and leadership. He has participated in multiple research conferences, including the Leading University Research Conference 2024, where he presented a paper on educational challenges faced by the children of internal migrant workers in Bangladesh. Sifat is also involved in extracurricular leadership development, having organized the 'Future Leader Program (FTP),' an initiative aimed at fostering leadership skills among school students.", "He is deeply interested in data science and is working towards becoming a data scientist, starting from the foundational level."], linkedIn: "https://www.linkedin.com/in/gmsifatiqbal/" },
    { name: "Abu Taher Muhammad", role: "Full-stack Developer", image: "/images/team/muhammad.png", description: ["Muhammad is a Computer Science and Engineering student at Metropolitan University, Sylhet. With experience at Ferne Health and Dot9.dev, he is specialize in building advanced web platforms, including algorithm-focused knowledge bases and WordPress plugin generators. Their expertise spans front-end and back-end technologies like Next.js, TypeScript, and Mongoose, with a strong emphasis on clean code, scalability, and performance.", "In addition the technical prowess, Muhammad has ventured into impactful projects such as a GIS platform for biodiversity analysis and a platform for open journalism, showcasing a passion for societal change and environmental responsibility. They continually seek to push boundaries, integrating innovative tools and fostering collaboration, all while maintaining a high standard of quality and attention to detail."], linkedIn: "https://www.linkedin.com/in/abutahermuhammad/", github: "https://github.com/xgovernor" },
    { name: "Dewan Tamanna Woud Dina", role: "Researcher", image: "/images/team/dina.png", description: ["I'm Dina (Researcher ) passionate about raising awareness of environmental challenges and the need for sustainable solutions. My background in engineering, combined with my interest in art, allows me to explore the balance between human needs and the beauty of nature. This perspective helps me address these pressing issues more thoughtfully. I aim to inspire others to understand the importance of protecting our natural world and to take meaningful actions that contribute to a healthier planet."] },
    { name: "Fariha Jahan Rifat", role: "Associate", image: "/images/team/rifat.png", description: ["I am Fariha Jahan Rifat (Associate), a first-year honors student in CSE. I have had a deep interest in space since childhood.I have skill in C, C++,Python and also i have skill in dancr, song, art, recite"] },
    { name: "MD. Shafiul Alam Tanjir", role: "Associate", image: "/images/team/tanjir.png", description: ["is an undergraduate student specializing in Electrical and Electronic Engineering (EEE). He is passionate about exploring the latest advancements in electronics, electrical systems, and renewable energy technologies. With a keen interest in both theoretical concepts and hands-on projects, Tanjir has been actively involved in various academic and extracurricular activities related to his field."] }
  ]

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <section className="mb-16 py-20 text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
          #NASASpaceApps
        </Badge>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl mb-6">
          SVLGDP: Strategic Visualization Lab for Geographic Data & Parameters
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Empowering researchers, policymakers, and citizens with cutting-edge geospatial insights
        </p>
        <Button size="lg" asChild>
          <Link href="/">
          Explore Our Platform
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <Separator className="my-16" />

      <section className="mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <div className="flex gap-10">
            <p className="w-1/2 mb-4 text-[15px]">
              SVLGDP is a cutting-edge GIS platform developed for the NASA Space App Challenge. Our mission is to leverage geospatial data and advanced visualization techniques to address critical environmental and social challenges.
            </p>
            <p className="w-1/2 mb-4 text-[15px]">
              Born from the innovative minds at Metropolitan University, Sylhet, our platform aims to bridge the gap between complex satellite data and actionable insights.
            </p>
          </div>
        </div>
      </section>

      <Separator className="my-16" />


      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Team</h2>
        <p className="max-w-2xl mx-auto text-center mb-12 text-lg text-gray-600">
          Meet the minds behind SVLGDP. Our diverse team of experts from Metropolitan University, Sylhet, brings together a wealth of knowledge in GIS, software development, data science, and environmental studies.
        </p>
        <div className="grid grid-cols-1 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex gap-8">

              <div className="w-40 min-w-40 flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-white/7 mb-4">{member.role}</p>
                <div className="flex space-x-4">
                  {member?.github && (
                    <Link href={member.github} aria-label={`${member.name}'s LinkedIn`} className="text-gray-600 hover:text-gray-900">
                      <Github className="w-5 h-5" />
                    </Link>
                  )}
                  {member?.linkedIn && (
                    <Link href={member.linkedIn} aria-label={`${member.name}'s LinkedIn`} className="text-gray-600 hover:text-gray-900">
                      <Linkedin className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                {member.description.map((line, i) => (
                  <p key={i} className="text-gray-400">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-16" />

      <section className="mb-16">
        <div className="bg-[#191919] border  rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-4">NASA Space App Challenge</h2>
          <p className="text-lg mb-4">
            SVLGDP was conceived and developed as part of the NASA Space App Challenge, a global hackathon that engages thousands of problem-solvers to address real-world challenges we face on Earth and in space.
          </p>
          <p className="text-lg mb-6">
            Our team&apos;s participation in this challenge has allowed us to collaborate with NASA and other space agencies, accessing cutting-edge data and technologies to create innovative solutions for global issues.
          </p>
          <Button variant="secondary" asChild>
            <Link href="https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/omega-point1/?tab=details" hrefLang="en" target="_blank">Visit Official Profile</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
