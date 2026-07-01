import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { REF_TABS } from '../content';
import { HtmlBlock } from '../components/HtmlBlock';

export function ReferencePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = REF_TABS.some((item) => item.id === searchParams.get('tab')) ? searchParams.get('tab') : REF_TABS[0].id;
  const [activeTab, setActiveTab] = useState(initialTab ?? REF_TABS[0].id);
  const tab = REF_TABS.find((item) => item.id === activeTab) ?? REF_TABS[0];

  return (
    <article>
      <h1 className="page-title">📖 Verilog 语法速查表</h1>
      <p className="page-sub">常用语法快速查阅。适合写题时回来看，但不要用它替代动手练习。</p>
      <div className="ref-tabs" role="tablist" aria-label="速查分类">
        {REF_TABS.map((item) => (
          <button
            key={item.id}
            className={`ref-tab ${item.id === activeTab ? 'active' : ''}`}
            type="button"
            role="tab"
            aria-selected={item.id === activeTab}
            onClick={() => {
              setActiveTab(item.id);
              setSearchParams({ tab: item.id });
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <HtmlBlock html={tab.content} className="ref-panel active" />
    </article>
  );
}
