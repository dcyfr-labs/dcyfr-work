import type { Metadata } from 'next';
import cliData from '@/data/cli-commands.json';
import type { CliCommand } from '@/lib/types';

export const metadata: Metadata = {
  title: 'CLI Reference',
  description: 'Complete reference for @dcyfr/ai-cli — agent run, delegate, workspace health, OpenSpec commands, and more.',
  openGraph: { url: 'https://dcyfr.work/cli' },
};

const commands = cliData as CliCommand[];

export default function CliPage() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">CLI Reference</h1>
          <p className="text-lg text-muted-foreground/80 mb-4">
            Complete command reference for{' '}
            <code className="text-primary bg-primary/10 border border-primary/40 rounded px-1.5 py-0.5 text-sm">
              @dcyfr/ai-cli
            </code>.
          </p>
          <div className="rounded-lg border border-border/40 bg-card/60 p-4">
            <p className="text-xs text-muted-foreground mb-2">Install</p>
            <code className="text-sm text-primary/60 font-mono">npm install -g @dcyfr/ai-cli</code>
          </div>
        </div>

        {/* Command list */}
        <div className="space-y-8">
          {commands.map((cmd) => (
            <article
              key={cmd.id}
              id={cmd.id}
              className="rounded-xl border border-border/40 bg-card/40 overflow-hidden"
            >
              {/* Command header */}
              <div className="border-b border-border/40 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                <code className="text-lg font-mono font-bold text-primary/60">{cmd.command}</code>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="border border-border/40 rounded px-2 py-0.5">{cmd.package}</span>
                  <span className="border border-border/40 rounded px-2 py-0.5">since {cmd.since}</span>
                </div>
              </div>

              <div className="px-5 py-4 space-y-4">
                {/* Description */}
                <p className="text-muted-foreground/80">{cmd.description}</p>

                {/* Usage */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Usage</p>
                  <pre className="text-sm text-primary bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 overflow-x-auto">
                    <code>{cmd.usage}</code>
                  </pre>
                </div>

                {/* Flags */}
                {cmd.flags && cmd.flags.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Flags</p>
                    <div className="space-y-1.5">
                      {cmd.flags.map((f) => (
                        <div key={f.flag} className="flex flex-wrap items-start gap-2 text-sm">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <code className="text-primary bg-primary/10 border border-primary/30 rounded px-2 py-0.5 font-mono text-xs">
                              {f.flag}
                            </code>
                            {f.alias && (
                              <code className="text-muted-foreground bg-muted/40 border border-border/30 rounded px-2 py-0.5 font-mono text-xs">
                                {f.alias}
                              </code>
                            )}
                            {/* Was `text-warning-foreground dark:text-warning`,
                                a fix for the old identity's mid-tone amber
                                --warning measuring 1.69:1 as text on a light
                                card. The contract dissolves the premise: light
                                --warning is now hsl(26 90% 37%), the dark end
                                of the hue, and --warning-foreground is
                                near-white in BOTH schemes. Keeping the old pair
                                would have inverted the fix into a 1.09:1 chip.
                                Fill drops to /5 because a wash of a dark-end
                                token sits deeper than the raw-palette /10
                                washes beside it: 4.40:1 at /10, 4.71:1 at /5,
                                and this is text-xs so AA wants 4.5. */}
                            {f.required && (
                              <span className="text-xs text-warning bg-warning/5 border border-warning/40 rounded px-1.5 py-0.5">
                                required
                              </span>
                            )}
                          </div>
                          <span className="text-muted-foreground">{f.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Examples</p>
                  <div className="space-y-1.5">
                    {cmd.examples.map((ex, i) => (
                      <pre
                        key={i}
                        className="text-sm text-muted-foreground/70 bg-muted/60 border border-border/40 rounded-lg px-4 py-2.5 overflow-x-auto"
                      >
                        <code>{ex}</code>
                      </pre>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
