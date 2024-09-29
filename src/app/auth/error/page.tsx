import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const error = searchParams.error as string

  const errors: { [key: string]: { title: string; description: string } } = {
    Configuration: {
      title: "Server error",
      description: "There is a problem with the server configuration. Please try again later.",
    },
    AccessDenied: {
      title: "Access denied",
      description: "You do not have permission to sign in.",
    },
    Verification: {
      title: "Unable to sign in",
      description: "The sign in link is no longer valid. It may have been used already or it may have expired.",
    },
    Default: {
      title: "Unable to sign in",
      description: "An error occurred while trying to sign in. Please try again.",
    },
  }

  const { title, description } = errors[error] || errors.Default

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[380px]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            If you continue to experience issues, please contact support.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Go back</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signin">Try again</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}