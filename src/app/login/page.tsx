"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Plain English error handling as requested
        if (error.message.includes("Invalid login credentials")) {
          setError("The email or password you entered is incorrect. Please try again.");
        } else {
          setError("Something went wrong while trying to log you in. Please check your connection and try again.");
        }
      } else {
        setSuccess(true);
        // Normally we would redirect to an admin dashboard here
        window.location.href = "/";
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>ADMIN_ACCESS</CardTitle>
            <CardDescription>Enter your credentials to manage portfolio data.</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="p-4 border border-accent bg-accent/10 text-accent mb-4 text-sm font-mono">
                Authentication successful. Redirecting...
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <div className="p-4 border border-error bg-error/10 text-error text-sm font-mono">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-annotation block">ADMIN_EMAIL</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-foreground focus:border-accent focus:outline-none py-2 text-body-md transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-annotation block">ACCESS_KEY</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-foreground focus:border-accent focus:outline-none py-2 text-body-md transition-colors"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="default" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "AUTHENTICATING..." : "VERIFY_CREDENTIALS"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
