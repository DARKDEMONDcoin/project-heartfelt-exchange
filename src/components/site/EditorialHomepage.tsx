import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  CornerDownLeft,
  Link2,
  Loader2,
  MessageSquareText,
  Send,
  Sparkles,
} from "lucide-react";

import { faqs } from "@/components/site/Faq";
import { Portrait } from "@/components/site/Portrait";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { plans } from "@/data/pricing";
import { team } from "@/data/team";

const workstream = [
  { time: "٠٧:٠٠", id: "eva", task: "ملخص الصباح", detail: "٤ رسائل تحتاج قرارك، واجتماعان اليوم. رتّبت أمَل الباقي." },
  { time: "٠٩:٣٠", id: "sam", task: "فرص المبيعات", detail: "جهّز سالم قائمة مطابقة ورسائل تواصل مخصصة لكل عميل." },
  { time: "١٢:٠٠", id: "nour", task: "حزمة محتوى", detail: "سلّمت نور مقالاً محسّناً للبحث وحزمة نشر جاهزة." },
  { time: "١٥:٢٠", id: "dana", task: "أصول الحملة", detail: "حوّلت دانة الفكرة إلى مقاسات متسقة مع هوية المشروع." },
  { time: "١٨:٤٥", id: "sonny", task: "المنشور مجدول", detail: "راجع سِراج المحتوى وحدد التوقيت الأنسب للنشر." },
  { time: "٢٣:٠٠", id: "adam", task: "تقرير اليوم", detail: "جمع آدم النتائج وحدد الخطوة الأهم لليوم التالي." },
] as const;

const integrations = ["إنستقرام", "لينكدإن", "واتساب", "جيميل", "شوبيفاي", "ووردبريس", "Analytics", "Notion"];

type DemoPhase = "idle" | "thinking" | "draft" | "approved";

function EmployeeRail({ selected, onSelect }: { selected: number; onSelect: (index: number) => void }) {
  return (
    <div className="mono-employee-rail" aria-label="اختر موظفاً رقمياً">
      {team.map((member, index) => (
        <Button
          key={member.id}
          type="button"
          variant="ghost"
          className={selected === index ? "is-active" : ""}
          onClick={() => onSelect(index)}
          aria-pressed={selected === index}
        >
          <Portrait memberId={member.id} name={member.name} eager={index < 2} />
          <span><strong>{member.name}</strong><small>{member.role}</small></span>
          <i aria-hidden="true" />
        </Button>
      ))}
    </div>
  );
}

function LiveWorkspace({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>("draft");
  const member = team[selected];

  if (!member) return null;

  return (
    <div className={`mono-workspace${compact ? " is-compact" : ""}`} aria-label="معاينة مساحة عمل سهل">
      <header className="mono-window-bar">
        <div className="mono-window-controls" aria-hidden="true"><i /><i /><i /></div>
        <strong>مساحة عمل سهل</strong>
        <span><i /> مباشر</span>
      </header>
      <div className="mono-workspace-grid">
        <EmployeeRail selected={selected} onSelect={(index) => { setSelected(index); setPhase("draft"); }} />
        <div className="mono-workspace-main">
          <header>
            <div><small>الموظف النشط</small><h3>{member.name}</h3></div>
            <span>{member.metrics[0]?.v}<small>{member.metrics[0]?.k}</small></span>
          </header>
          <div className="mono-conversation">
            <p className="is-owner">جهّز أهم مهمة اليوم بنفس نبرة علامتنا.</p>
            <div className="is-employee">
              <Portrait memberId={member.id} name={member.name} eager />
              <p><strong>{member.tagline}</strong><span>{member.summary}</span></p>
            </div>
          </div>
          <div className={`mono-deliverable phase-${phase}`}>
            <div><Sparkles aria-hidden="true" /><span><small>{phase === "approved" ? "تم التنفيذ" : "جاهز للمراجعة"}</small><strong>{member.tasks[0]}</strong></span></div>
            <Button type="button" onClick={() => setPhase("approved")} disabled={phase === "approved"}>
              {phase === "approved" ? <><Check aria-hidden="true" /> تمت الموافقة</> : <>موافقة وتنفيذ <ChevronLeft aria-hidden="true" /></>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SirajStudio() {
  const [prompt, setPrompt] = useState("اكتب منشوراً لإطلاق منتجنا الجديد بنبرة واثقة وبسيطة");
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const timers = useRef<number[]>([]);
  const siraj = team.find((member) => member.id === "sonny");

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function runDemo() {
    if (!prompt.trim() || phase === "thinking") return;
    timers.current.forEach(window.clearTimeout);
    setPhase("thinking");
    timers.current = [
      window.setTimeout(() => setPhase("draft"), 1250),
    ];
  }

  return (
    <div className="mono-studio" id="siraj-demo">
      <header className="mono-window-bar">
        <div className="mono-window-controls" aria-hidden="true"><i /><i /><i /></div>
        <strong>محادثة مع سِراج</strong>
        <span><i /> متصل</span>
      </header>
      <div className="mono-studio-body">
        <aside>
          <Portrait memberId="sonny" name="سِراج" eager />
          <strong>سِراج</strong>
          <span>مدير السوشيال ميديا</span>
          <div><b>٢٦</b><small>قدرة متخصصة</small></div>
        </aside>
        <div className="mono-studio-chat">
          <div className="mono-message is-owner"><span>أنت</span><p>{prompt || "اكتب طلبك لسِراج..."}</p></div>
          {phase === "thinking" ? (
            <div className="mono-thinking" role="status"><Loader2 aria-hidden="true" /><span>سِراج يراجع نبرة العلامة ويجهّز المسودة</span><i /><i /><i /></div>
          ) : null}
          {phase === "draft" || phase === "approved" ? (
            <div className="mono-message is-siraj">
              <span>سِراج · مسودة جاهزة</span>
              <p>{siraj?.sample[0]?.body}</p>
              <footer><span>#نمو_المشاريع</span><span>إنستقرام</span><span>اليوم، ٨:٣٠ م</span></footer>
            </div>
          ) : null}
          {phase === "approved" ? <div className="mono-scheduled" role="status"><CheckCircle2 /><span><strong>تمت الموافقة والجدولة</strong><small>سيُنشر اليوم في ٨:٣٠ م</small></span></div> : null}
          <div className="mono-composer">
            <label htmlFor="siraj-prompt">طلبك لسِراج</label>
            <textarea id="siraj-prompt" value={prompt} onChange={(event) => { setPrompt(event.target.value); setPhase("idle"); }} rows={2} />
            <Button type="button" size="icon" onClick={runDemo} disabled={!prompt.trim() || phase === "thinking"} aria-label="إرسال الطلب">
              {phase === "thinking" ? <Loader2 className="animate-spin" /> : <Send />}
            </Button>
          </div>
          {(phase === "draft" || phase === "approved") ? (
            <div className="mono-approval-row">
              <Button type="button" variant="outline" onClick={() => setPhase("idle")}>تعديل الطلب</Button>
              <Button type="button" onClick={() => setPhase("approved")} disabled={phase === "approved"}><Check /> {phase === "approved" ? "تمت الموافقة" : "موافقة وجدولة"}</Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function WorkflowHandoff() {
  const steps = [
    { id: "nour", label: "بحث وكتابة", result: "موجز المحتوى جاهز" },
    { id: "dana", label: "تصميم الأصول", result: "٤ مقاسات جاهزة" },
    { id: "sonny", label: "جدولة ونشر", result: "بانتظار الموافقة" },
    { id: "adam", label: "قياس النتائج", result: "يبدأ بعد النشر" },
  ];
  const [active, setActive] = useState(2);

  return (
    <div className="mono-handoff">
      <div className="mono-handoff-line" aria-hidden="true"><i style={{ transform: `scaleX(${active / (steps.length - 1)})` }} /></div>
      {steps.map((step, index) => {
        const member = team.find((item) => item.id === step.id);
        if (!member) return null;
        return (
          <Button key={step.id} type="button" variant="ghost" className={index <= active ? "is-complete" : ""} onClick={() => setActive(index)}>
            <span className="mono-step-index">٠{index + 1}</span>
            <Portrait memberId={member.id} name={member.name} />
            <span><strong>{member.name}</strong><small>{step.label}</small><em>{index < active ? "مكتمل" : index === active ? step.result : "التالي"}</em></span>
          </Button>
        );
      })}
    </div>
  );
}

export function EditorialHomepage() {
  const [activeMoment, setActiveMoment] = useState(0);
  const [activeIntegration, setActiveIntegration] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dayTimer = window.setInterval(() => setActiveMoment((value) => (value + 1) % workstream.length), 3000);
    const appTimer = window.setInterval(() => setActiveIntegration((value) => (value + 1) % integrations.length), 1800);
    return () => { window.clearInterval(dayTimer); window.clearInterval(appTimer); };
  }, []);

  const activeWork = workstream[activeMoment] ?? workstream[0];
  const activeWorker = useMemo(() => team.find((member) => member.id === activeWork?.id) ?? team[0], [activeWork]);

  return (
    <div className="mono-home">
      <section className="mono-hero" aria-labelledby="home-title">
        <div className="mono-grid-field" aria-hidden="true" />
        <div className="mono-shell mono-hero-grid">
          <div className="mono-hero-copy">
            <p className="mono-kicker"><span>الإصدار الجديد</span> فريق عمل عربي، جاهز الآن.</p>
            <h1 id="home-title">كل شغل مشروعك.<br /><em>يُنجز من مكان واحد.</em></h1>
            <p>ستة موظفين رقميين يكتبون ويصمّمون ويبيعون وينظّمون ويحلّلون — بالعربية، وبنبرة مشروعك، وعلى مدار الساعة.</p>
            <div className="mono-actions">
              <Link to="/auth" search={{ mode: "signup" as const }}>ابدأ مجاناً <ArrowLeft /></Link>
              <a href="#siraj-demo"><MessageSquareText /> جرّب محادثة حقيقية</a>
            </div>
            <span className="mono-trial"><CheckCircle2 /> ١٤ يوماً مجاناً · بدون بطاقة بنكية</span>
          </div>
          <div className="mono-hero-product"><LiveWorkspace compact /></div>
        </div>
        <div className="mono-scroll-cue" aria-hidden="true"><span>مرّر لتشاهد الفريق يعمل</span><i /></div>
      </section>

      <section className="mono-proof" aria-label="نطاق عمل سهل">
        <div className="mono-shell">
          <p>مساحة واحدة لدورة العمل كاملة</p>
          <div><span><strong>٦</strong> موظفين متخصصين</span><span><strong>٢٤/٧</strong> عمل مستمر</span><span><strong>٧</strong> منصات نشر</span><span><strong>١٥</strong> مصدر بيانات</span></div>
        </div>
      </section>

      <section className="mono-team-system" id="team">
        <div className="mono-shell">
          <header className="mono-section-head"><span>٠١ — الفريق</span><h2>ليست أدوات متفرقة.<br />إنها منظومة تسلّم بعضها.</h2><p>اختر أي موظف لترى تخصصه ومخرجاته. كل شخص يعرف دوره، والسياق ينتقل معه إلى الخطوة التالية.</p></header>
          <div className="mono-team-grid">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <Link key={member.id} to="/employees/$id" params={{ id: member.id }} className="mono-team-cell">
                  <span className="mono-cell-number">٠{index + 1}</span><Icon aria-hidden="true" />
                  <Portrait memberId={member.id} name={member.name} eager={index < 2} />
                  <div><small>{member.role}</small><h3>{member.name}</h3><p>{member.title}</p><span>{member.tasks[0]} <ArrowLeft /></span></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mono-day">
        <div className="mono-shell mono-day-layout">
          <div className="mono-day-copy"><span>٠٢ — يوم داخل سهل</span><h2>العمل يتحرك،<br />حتى عندما لا تتابعه.</h2><p>من أول ملخص صباحي إلى آخر تقرير في الليل، كل مهمة لها صاحب وحالة ونتيجة واضحة.</p></div>
          <div className="mono-day-stage">
            <div className="mono-day-focus" key={activeWork?.time}>
              {activeWorker ? <Portrait memberId={activeWorker.id} name={activeWorker.name} /> : null}
              <div><time>{activeWork?.time}</time><small>{activeWorker?.name} · {activeWorker?.role}</small><h3>{activeWork?.task}</h3><p>{activeWork?.detail}</p><span><i /> يعمل الآن</span></div>
            </div>
            <div className="mono-day-timeline">
              {workstream.map((item, index) => <Button key={item.time} type="button" variant="ghost" className={activeMoment === index ? "is-active" : ""} onClick={() => setActiveMoment(index)}><time>{item.time}</time><span>{team.find((member) => member.id === item.id)?.name}</span></Button>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mono-siraj-section">
        <div className="mono-shell">
          <header className="mono-section-head"><span>٠٣ — جرّب المنتج</span><h2>اكتب الطلب.<br />وشاهد سِراج ينفّذه.</h2><p>هذه ليست صورة واجهة. غيّر الطلب، أرسله، راجع المسودة، ثم وافق على جدولتها.</p></header>
          <SirajStudio />
        </div>
      </section>

      <section className="mono-flow-section">
        <div className="mono-shell">
          <header className="mono-section-head is-wide"><span>٠٤ — التسليم الذكي</span><h2>مهمة واحدة.<br />أربعة تخصصات. لا متابعة يدوية.</h2></header>
          <WorkflowHandoff />
        </div>
      </section>

      <section className="mono-network-section">
        <div className="mono-shell mono-network-layout">
          <header className="mono-section-head"><span>٠٥ — التكاملات</span><h2>السياق ينتقل.<br />الفوضى لا تنتقل.</h2><p>اربط الأدوات التي تعمل بها، ودع الموظف المناسب يقرأ المهمة وينفذها ويعيد النتيجة إلى سهل.</p><Link to="/integrations">استكشف التكاملات <ArrowLeft /></Link></header>
          <div className="mono-network" aria-label="شبكة تكاملات سهل">
            <div className="mono-network-core"><Sparkles /><strong>سهل</strong><small>ذاكرة مشروعك</small></div>
            {integrations.map((app, index) => <Button key={app} type="button" variant="outline" className={`app-${index + 1}${activeIntegration === index ? " is-active" : ""}`} onClick={() => setActiveIntegration(index)}><Link2 />{app}</Button>)}
            <span className="mono-data-pulse" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="mono-use-cases">
        <div className="mono-shell"><header className="mono-section-head"><span>٠٦ — حسب مشروعك</span><h2>فريق واحد.<br />سياق مختلف لكل نشاط.</h2></header>
          <div className="mono-use-grid">
            <Link to="/use-cases/ecommerce"><span>٠١</span><small>المتاجر الإلكترونية</small><h3>محتوى، حملات، دعم ومتابعة مبيعات.</h3><ArrowLeft /></Link>
            <Link to="/use-cases/restaurants"><span>٠٢</span><small>المطاعم والكافيهات</small><h3>حضور محلي مستمر وردود لا تتأخر.</h3><ArrowLeft /></Link>
            <Link to="/use-cases/clinics"><span>٠٣</span><small>العيادات</small><h3>تنظيم المواعيد ومحتوى يبني الثقة.</h3><ArrowLeft /></Link>
            <Link to="/use-cases/realestate"><span>٠٤</span><small>العقار والمقاولات</small><h3>فرص مؤهلة وعروض جاهزة للمتابعة.</h3><ArrowLeft /></Link>
          </div>
        </div>
      </section>

      <section className="mono-pricing" id="pricing">
        <div className="mono-shell"><header className="mono-section-head is-wide"><span>٠٧ — الأسعار</span><h2>ابدأ بحجمك اليوم.<br />وكبّر الفريق عندما تحتاج.</h2></header>
          <div className="mono-plan-grid">
            {plans.map((plan) => <article key={plan.id} className={plan.highlight ? "is-highlight" : ""}><span>{plan.tag}</span><h3>{plan.name}</h3><div>{plan.monthly ? <><strong>{plan.monthly.toLocaleString("ar-SA")}</strong><small>ر.س / شهرياً</small></> : <strong className="is-text">حسب الطلب</strong>}</div><p>{plan.desc}</p><ul>{plan.perks.slice(0, 4).map((perk) => <li key={perk}><Check />{perk}</li>)}</ul><Link to={plan.monthly ? "/auth" : "/contact"} search={plan.monthly ? { mode: "signup" as const } : undefined}>{plan.cta}<ArrowLeft /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="mono-faq" id="faq"><div className="mono-shell mono-faq-layout"><header className="mono-section-head"><span>٠٨ — قبل أن تبدأ</span><h2>إجابات واضحة.</h2><p>كل ما تحتاج معرفته قبل توظيف فريقك الرقمي.</p></header><Accordion type="single" collapsible>{faqs.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger>{item.q}</AccordionTrigger><AccordionContent>{item.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <section className="mono-final"><div className="mono-grid-field" aria-hidden="true" /><div className="mono-shell"><span>الفريق جاهز</span><h2>حوّل قائمة المهام<br />إلى نتائج مكتملة.</h2><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ ١٤ يوماً مجاناً <ArrowLeft /></Link><p><Clock3 /> الإعداد الأول يستغرق دقائق</p></div></section>
      <SiteFooter />
    </div>
  );
}