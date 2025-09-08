import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Cloud, Cpu, Leaf, TrendingUp, Zap, Eye } from "lucide-react"
import { AuthNavigation } from "@/components/auth/auth-navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AgriTech AI</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#solution" className="text-muted-foreground hover:text-foreground transition-colors">
              Solution
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </nav>
          <AuthNavigation />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
            AI-Powered Agricultural Intelligence
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Smart Farming for a<span className="text-primary"> Sustainable Future</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Harness the power of AI/ML climate predictions, IoT monitoring, and sustainability analytics to make
            data-driven decisions that boost yields while protecting our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 bg-transparent"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">The Challenge We're Solving</h2>
            <p className="text-lg text-muted-foreground">
              Modern agriculture faces unprecedented challenges that require intelligent solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Climate Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Climate change impacts crop yields and farming practices, with unpredictable weather patterns making
                  planning increasingly difficult for farmers worldwide.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Fragmented Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lack of integrated solutions combining yield prediction and sustainability analytics leaves farmers
                  without actionable, real-time insights for better decision-making.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive research approach combines cutting-edge technology with practical farming insights
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Cloud className="h-6 w-6" />
                  Climate Forecasting
                </CardTitle>
                <CardDescription>AI/ML-powered predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced machine learning models analyze climate patterns to provide accurate weather forecasts and
                  seasonal predictions for optimal crop planning.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Zap className="h-6 w-6" />
                  IoT Farm Monitoring
                </CardTitle>
                <CardDescription>Real-time sensor integration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive IoT-based monitoring systems track soil moisture, temperature, humidity, and other
                  critical parameters for data-driven farming decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <TrendingUp className="h-6 w-6" />
                  Smart Alerts
                </CardTitle>
                <CardDescription>Automated notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time alerts for irrigation schedules, pest control measures, and optimal harvesting times to
                  maximize yield and minimize resource waste.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Leaf className="h-6 w-6" />
                  Carbon Tracking
                </CardTitle>
                <CardDescription>Sustainability analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor carbon emissions and receive recommendations for green farming practices that reduce
                  environmental impact while maintaining productivity.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Cpu className="h-6 w-6" />
                  Interactive Dashboard
                </CardTitle>
                <CardDescription>Comprehensive insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  User-friendly dashboard providing actionable insights, trend analysis, and personalized
                  recommendations for improved farm management.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Eye className="h-6 w-6" />
                  Plant Detection
                </CardTitle>
                <CardDescription>AI-powered recognition</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced computer vision technology for plant health monitoring, disease detection, and crop
                  identification to ensure optimal plant care.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of farmers already using AgriTech AI to increase yields, reduce costs, and farm more
            sustainably.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Access Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">AgriTech AI</span>
          </div>
          <p className="text-muted-foreground">Empowering sustainable agriculture through intelligent technology</p>
        </div>
      </footer>
    </div>
  )
}
