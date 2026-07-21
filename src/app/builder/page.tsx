'use client';

import { Code2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function BuilderPage() {
  const [appDescription, setAppDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateApp = async () => {
    setIsGenerating(true);
    // TODO: Integrate with Vercel AI SDK
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-gold" />
            <span className="text-sm font-semibold text-gold uppercase tracking-wider">AI Builder</span>
          </div>
          <h1 className="text-5xl font-serif font-bold">Generate Apps with AI</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Describe your app idea in natural language and watch it come to life in minutes
          </p>
        </div>
      </div>

      {/* Builder */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Describe Your App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              placeholder="Example: A social media app for sharing code snippets with syntax highlighting and upvoting..."
              className="w-full bg-ink-800 border border-neutral-700 rounded-lg p-4 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold min-h-[200px]"
            />
            <Button
              onClick={handleGenerateApp}
              disabled={!appDescription.trim() || isGenerating}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin-slow mr-2">⚙️</span>
                  Generating...
                </>
              ) : (
                <>
                  <Code2 className="mr-2 h-5 w-5" />
                  Generate App
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-serif font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: 1, title: 'Describe', desc: 'Tell us what you want to build' },
            { step: 2, title: 'Generate', desc: 'AI creates your full-stack app' },
            { step: 3, title: 'Deploy', desc: 'Deploy to production instantly' },
          ].map((item) => (
            <div key={item.step} className="glass p-6 text-center">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gold/10 text-gold font-bold mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
