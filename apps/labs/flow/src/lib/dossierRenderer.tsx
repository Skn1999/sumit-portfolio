import React from 'react';
import { ExternalLink, Pin } from 'lucide-react';

export const parseFormattedText = (text: string) => {
  const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|\`.*?\`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0066cc] underline hover:text-[#004499] inline-flex items-center gap-0.5 font-medium cursor-pointer"
          >
            {match[1]}
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>
        );
      }
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#1a140b]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[11px] text-[#4a3b1a] border border-[#ebd8ba]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

export interface ParsedDossier {
  title: string;
  summary: string;
  findings: Array<{ title: string; text: string }>;
  actions: string[];
  sources: Array<{ label: string; url: string }>;
  isParsed: boolean;
}

export const parseExecutiveDossier = (content: string): ParsedDossier => {
  let title = '';
  let summary = '';
  const findings: Array<{ title: string; text: string }> = [];
  const actions: string[] = [];
  const sources: Array<{ label: string; url: string }> = [];

  const lines = content.split('\n');
  let currentSection = '';

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('# ')) {
      title = trimmed.slice(2).replace(/^Executive Briefing Dossier:\s*/i, '').replace(/^Executive Briefing:\s*/i, '');
      continue;
    }

    if (trimmed.startsWith('## ')) {
      const header = trimmed.slice(3).toLowerCase();
      if (header.includes('summary')) currentSection = 'summary';
      else if (header.includes('finding') || header.includes('signal') || header.includes('market') || header.includes('context')) currentSection = 'findings';
      else if (header.includes('step') || header.includes('action') || header.includes('implication')) currentSection = 'actions';
      else if (header.includes('source') || header.includes('reference')) currentSection = 'sources';
      else currentSection = 'other';
      continue;
    }

    if (currentSection === 'summary') {
      if (!trimmed.startsWith('---') && !trimmed.startsWith('**Prepared')) {
        summary += (summary ? ' ' : '') + trimmed;
      }
    } else if (currentSection === 'findings') {
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const item = trimmed.slice(2);
        const match = item.match(/^\*\*(.*?)\*\*[:\-]?\s*(.*)$/);
        if (match) {
          findings.push({ title: match[1].trim(), text: match[2].trim() });
        } else {
          findings.push({ title: 'Key Insight', text: item });
        }
      }
    } else if (currentSection === 'actions') {
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        const text = numMatch[2].replace(/^\*\*(.*?)\*\*[:\-]?\s*/, '$1: ');
        actions.push(text);
      } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        actions.push(trimmed.slice(2));
      }
    } else if (currentSection === 'sources') {
      const linkMatch = trimmed.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        sources.push({ label: linkMatch[1], url: linkMatch[2] });
      }
    }
  }

  return {
    title,
    summary,
    findings,
    actions,
    sources,
    isParsed: Boolean(summary || findings.length > 0),
  };
};

export const renderDossierContent = (
  content: string,
  onPinAction?: (actionText: string) => void
) => {
  const parsed = parseExecutiveDossier(content);

  if (parsed.isParsed) {
    return (
      <div className="space-y-4 font-sans text-xs text-[#2d220f] leading-relaxed">
        {parsed.title && (
          <div className="border-b border-[#e8d7b8] pb-1.5">
            <h3 className="font-editorial text-lg font-bold text-[#1a140b]">
              {parsed.title}
            </h3>
          </div>
        )}

        {parsed.summary && (
          <div className="p-3.5 rounded-xl bg-[#fffbf2] border border-[#ebd8ba] text-xs font-editorial leading-relaxed text-[#241c10]">
            {parseFormattedText(parsed.summary)}
          </div>
        )}

        {parsed.findings.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-editorial text-sm font-semibold text-[#241c10]">
              Key Findings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {parsed.findings.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#faf7f2] border border-[#e5dfd5] space-y-1"
                >
                  <h5 className="font-editorial text-xs font-bold text-[#030302]">
                    {f.title}
                  </h5>
                  <p className="text-[11px] text-[#524942] leading-relaxed">
                    {parseFormattedText(f.text)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {parsed.actions.length > 0 && (
          <div className="space-y-2 pt-1">
            <h4 className="font-editorial text-sm font-semibold text-[#241c10]">
              Next Steps
            </h4>
            <div className="space-y-1.5">
              {parsed.actions.map((act, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-xl border border-[#ece6dd] bg-[#faf7f2] flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#8a7f75]">{idx + 1}.</span>
                    <span className="text-[#030302] text-[11px]">{parseFormattedText(act)}</span>
                  </div>
                  {onPinAction && (
                    <button
                      type="button"
                      onClick={() => onPinAction(act)}
                      className="px-2 py-0.5 rounded-md text-[10px] text-[#6e645c] hover:bg-[#ede6dc] hover:text-[#030302] transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
                      title="Pin this action as a note"
                    >
                      <Pin className="w-2.5 h-2.5" />
                      <span>Pin</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {parsed.sources.length > 0 && (
          <div className="pt-2 border-t border-[#ece6dd] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-mono text-[#7d746c]">
            <span>Sources:</span>
            {parsed.sources.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0066cc] hover:underline inline-flex items-center gap-0.5"
              >
                {s.label}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  const lines = content.split('\n');
  return (
    <div className="space-y-2.5 font-sans text-xs text-[#2d220f] leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-0.5" />;

        if (trimmed.startsWith('# ')) {
          return (
            <h3 key={idx} className="font-editorial text-lg font-bold text-[#1a140b] border-b border-[#e8d7b8] pb-1.5 pt-1">
              {trimmed.slice(2)}
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h4 key={idx} className="font-editorial text-sm font-bold text-[#3d2c14] pt-2.5 pb-0.5 flex items-center gap-1.5">
              {trimmed.slice(3)}
            </h4>
          );
        }
        if (trimmed === '---') {
          return <hr key={idx} className="border-t border-[#ebd8ba] my-2" />;
        }
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const itemText = trimmed.slice(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4a56a] mt-1.5 flex-shrink-0" />
              <div className="flex-1 leading-relaxed">
                {parseFormattedText(itemText)}
              </div>
            </div>
          );
        }
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5">
              <span className="font-mono text-[10px] font-bold text-[#c4a56a] mt-0.5 flex-shrink-0 w-3.5">
                {numMatch[1]}.
              </span>
              <div className="flex-1 leading-relaxed">
                {parseFormattedText(numMatch[2])}
              </div>
            </div>
          );
        }
        return (
          <p key={idx} className="leading-relaxed">
            {parseFormattedText(trimmed)}
          </p>
        );
      })}
    </div>
  );
};
