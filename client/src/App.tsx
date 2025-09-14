import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import ArtworkDetail from "@/pages/ArtworkDetail";
import AddArtwork from "@/pages/AddArtwork";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/AdminDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/artwork/:id" component={ArtworkDetail} />
      <Route path="/add" component={AddArtwork} />
      <Route path="/about" component={About} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <Router />
          </main>
          
          {/* Footer */}
          <footer className="bg-card border-t border-border mt-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-8 mb-8">
                  <a href="/" className="text-muted-foreground hover:text-primary transition-colors">หน้าแรก</a>
                  <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">เกี่ยวกับ</a>
                  <a href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">แกลเลอรี</a>
                  <a href="/add" className="text-muted-foreground hover:text-primary transition-colors">เพิ่มผลงาน</a>
                </div>
                <p className="text-muted-foreground">
                  &copy; 2024 นิทรรศการศิลปะออนไลน์. สงวนลิขสิทธิ์.
                </p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
