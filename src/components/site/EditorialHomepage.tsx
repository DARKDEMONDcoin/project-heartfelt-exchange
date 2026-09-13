import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronLeft,
  CircleGauge,
  Clock3,
  Link2,
  MessageSquareText,
  Play,
  ShieldCheck,
  Sparkles,
  Workflow,
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

const integrations = [
  "إنستقرام",
  "لينكدإن",
  "واتساب",
  "جيميل",
  "شوبيفاي",
  "ووردبريس",
  "Google Analytics",
  "Notion",
];

const workstream = [
  { time: "٠٧:٠٠", id: "eva", task: "ملخص صباحي جاهز", detail: "رتّبت أمَل البريد وحددت ٤ رسائل تحتاج قرارك." },
  { time: "٠٩:٣٠", id: "sam", task: "فرص جديدة في خط المبيعات", detail: "جهّز سالم قائمة عملاء ورسائل تواصل مخصصة." },
  { time: "١٢:٠٠", id: "nour", task: "مقال جاهز للنشر", detail: "سلّمت نور حزمة محتوى محسّنة للبحث بالعربية." },
  { time: "١٥:٢٠", id: "dana", task: "التصاميم بكل المقاسات", detail: "حوّلت دانة الفكرة إلى أصول متسقة مع الهوية." },
  { time: "١٨:٤٥", id: "sonny", task: "نُشر في التوقيت الأفضل", detail: "نشر سِراج المحتوى وبدأ متابعة التعليقات." },
  { time: "٢٣:٠٠", id: "adam", task: "تقرير اليوم مكتمل", detail: "جمع آدم النتائج وحدد فرص التحسين للغد." },
];

function ArrowLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link to={to} className="stripe-arrow-link">
      {children}<ArrowLeft aria-hidden="true" />
    </Link>
  );
}

function ProductConsole({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [approved, setApproved] = useState(false);
  const member = team[selected];

  if (!member) return null;

  return (
    <div className={`stripe-console${compact ? " is-compact" : ""}`} aria-label="مساحة عمل سهل التفاعلية">
      <header className="stripe-console-bar">
        <div className="stripe-console-dots" aria-hidden="true"><i /><i /><i /></div>
        <strong>مساحة عمل سهل</strong>
        <span><i /> يعمل الآن</span>
      </header>
      <div className="stripe-console-body">
        <aside className="stripe-console-rail" aria-label="اختر موظفاً">
          {team.map((person, index) => (
            <Button
              key={person.id}
              type="button"
              variant="ghost"
              className={selected === index ? "is-active" : ""}
              onClick={() => { setSelected(index); setApproved(false); }}
              aria-label={`اختيار ${person.name}`}
              aria-pressed={selected === index}
            >
              <Portrait memberId={person.id} name={person.name} eager={index < 2} />
              <span><b>{person.name}</b><small>{person.role}</small></span>
            </Button>
          ))}
        </aside>
        <div className="stripe-console-main">
          <div className="stripe-console-heading">
            <div><small>الموظف النشط</small><h3>{member.name}</h3></div>
            <span>{member.metrics[0]?.v} <small>{member.metrics[0]?.k}</small></span>
          </div>
          <div className="stripe-chat">
            <p className="is-user">جهّز أهم مهمة اليوم بنفس نبرة علامتنا.</p>
            <div className="is-agent">
              <Portrait memberId={member.id} name={member.name} eager />
              <p><strong>{member.tagline}</strong><span>{member.summary}</span></p>
            </div>
          </div>
          <div className="stripe-output">
            <div><Sparkles aria-hidden="true" /><span><small>جاهز للمراجعة</small><strong>{member.tasks[0]}</strong></span></div>
            <Button type="button" onClick={() => setApproved(true)} disabled={approved}>
              {approved ? <><Check aria-hidden="true" /> تمت الموافقة</> : <>موافقة وتنفيذ <ChevronLeft aria-hidden="true" /></>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditorialHomepage() {
  const [activeMoment, setActiveMoment] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActiveMoment((current) => (current + 1) % workstream.length),
      2800,
    );
    return () => window.clearInterval(timer);
  }, []);

  const activeWork = workstream[activeMoment] ?? workstream[0];
  const activeWorker = team.find((member) => member.id === activeWork?.id) ?? team[0];

  return (
    <div className="stripe-home">
      <section className="stripe-hero" aria-labelledby="home-title">
        <div className="stripe-spectrum" aria-hidden="true"><i /><i /><i /></div>
        <div className="stripe-shell stripe-hero-grid">
          <div className="stripe-hero-copy">
            <p className="stripe-eyebrow"><Sparkles aria-hidden="true" /> فريق عمل عربي. مدعوم بالذكاء الاصطناعي.</p>
            <h1 id="home-title">كل شغل مشروعك.<br /><em>فريق واحد ينجزه.</em></h1>
            <p>وظّف ستة موظفين رقميين يكتبون ويصمّمون ويبيعون وينظّمون ويحلّلون — بالعربية، وبنبرة مشروعك، وعلى مدار الساعة.</p>
            <div className="stripe-actions">
              <Link to="/auth" search={{ mode: "signup" as const }} className="stripe-primary-action">ابدأ مجاناً <ArrowLeft aria-hidden="true" /></Link>
              <a href="#product" className="stripe-secondary-action"><Play aria-hidden="true" /> شاهد الفريق يعمل</a>
            </div>
            <span className="stripe-trial"><CheckCircle2 aria-hidden="true" /> ١٤ يوماً مجاناً · بدون بطاقة بنكية</span>
          </div>
          <div className="stripe-hero-product"><ProductConsole compact /></div>
        </div>
      </section>

      <section className="stripe-trust" aria-label="نطاق عمل سهل">
        <div className="stripe-shell">
          <p>مساحة عمل واحدة تدير دورة مشروعك كاملة</p>
          <div>
            <span><strong>٦</strong> موظفين متخصصين</span>
            <span><strong>٢٤/٧</strong> عمل مستمر</span>
            <span><strong>٧</strong> منصات نشر</span>
            <span><strong>١٥</strong> مصدر بيانات</span>
          </div>
        </div>
      </section>

      <section className="stripe-solutions" id="team">
        <div className="stripe-shell">
          <header className="stripe-section-heading">
            <p>نظام عمل متكامل</p>
            <h2>من الفكرة إلى النتيجة،<br />كل خطوة لها صاحب.</h2>
            <span>لا أدوات متفرقة ولا متابعة يدوية. اختر المهمة، ويعرف الفريق كيف يمررها بين التخصصات حتى تصبح جاهزة لموافقتك.</span>
          </header>
          <div className="stripe-solution-grid">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <article key={member.id} className={`stripe-solution solution-${index + 1}`}>
                  <div className="stripe-solution-copy">
                    <span><Icon aria-hidden="true" /> {member.role}</span>
                    <h3>{member.name}</h3>
                    <p>{member.title}</p>
                    <Link to="/employees/$id" params={{ id: member.id }}>اعرف ما ينجزه <ArrowLeft aria-hidden="true" /></Link>
                  </div>
                  <div className="stripe-solution-visual">
                    <Portrait memberId={member.id} name={member.name} eager={index < 2} />
                    <span><i /> {member.tasks[0]}</span>
                    <strong>{member.metrics[0]?.v}<small>{member.metrics[0]?.k}</small></strong>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="stripe-outcomes">
        <div className="stripe-shell">
          <header className="stripe-section-heading is-wide">
            <p>وقت أقل في التشغيل. مساحة أكبر للنمو.</p>
            <h2>احتفظ بالقرارات.<br />دع سهل يتولى الباقي.</h2>
          </header>
          <div className="stripe-outcome-numbers">
            <article><strong>١٢</strong><h3>ساعة موفّرة أسبوعياً</h3><p>في البريد والمواعيد مع أمَل.</p></article>
            <article><strong>٣٠٠</strong><h3>كلمة مستهدفة</h3><p>تتابعها نور ضمن منظومة المحتوى.</p></article>
            <article><strong>١٬٥٠٠</strong><h3>رسالة مبيعات شهرياً</h3><p>يخصصها سالم ويتابع الردود.</p></article>
            <article><strong>٣٫٢×</strong><h3>نمو التفاعل</h3><p>ضمن قدرات سِراج المتخصصة.</p></article>
          </div>
        </div>
      </section>

      <section className="stripe-day">
        <div className="stripe-shell stripe-day-grid">
          <div className="stripe-day-copy">
            <p>يوم كامل داخل سهل</p>
            <h2>العمل يتحرك حتى عندما لا تتابعه.</h2>
            <span>كل مهمة لها حالة واضحة، ومخرج قابل للمراجعة، ونقطة موافقة قبل أي خطوة حساسة.</span>
            <ArrowLink to="/how-it-works">شاهد كيف يعمل سهل</ArrowLink>
          </div>
          <div className="stripe-day-stage">
            {activeWorker && activeWork ? (
              <div className="stripe-day-focus">
                <Portrait memberId={activeWorker.id} name={activeWorker.name} />
                <div><time>{activeWork.time}</time><small>{activeWorker.name} · {activeWorker.role}</small><h3>{activeWork.task}</h3><p>{activeWork.detail}</p></div>
              </div>
            ) : null}
            <div className="stripe-day-tabs">
              {workstream.map((item, index) => (
                <Button key={item.time} type="button" variant="ghost" onClick={() => setActiveMoment(index)} className={activeMoment === index ? "is-active" : ""} aria-pressed={activeMoment === index}>
                  <time>{item.time}</time><span>{team.find((member) => member.id === item.id)?.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stripe-infrastructure">
        <div className="stripe-dark-grid" aria-hidden="true" />
        <div className="stripe-shell">
          <header className="stripe-section-heading is-dark">
            <p>البنية التي تربط الفريق</p>
            <h2>سياق مشروعك ينتقل.<br />الفوضى لا تنتقل.</h2>
            <span>يرى كل موظف ما يحتاجه من هوية مشروعك، المهام السابقة، والأدوات المرتبطة — ثم يسلّم النتيجة للخطوة التالية.</span>
          </header>
          <div className="stripe-infra-grid">
            <article><Workflow aria-hidden="true" /><h3>مسارات مشتركة</h3><p>يحوّل سِراج فكرة نور إلى منشور، وتجهز دانة أصوله، ثم يقيس آدم النتيجة.</p></article>
            <article><ShieldCheck aria-hidden="true" /><h3>أنت صاحب الموافقة</h3><p>تظل الخطوات الحساسة في انتظار قرارك، بسجل واضح لكل ما تم.</p></article>
            <article><CircleGauge aria-hidden="true" /><h3>رؤية لحظية</h3><p>تعرف من يعمل، وما الذي اكتمل، وأين تحتاج المهمة إلى تدخلك.</p></article>
          </div>
          <div className="stripe-network">
            <div className="stripe-network-core"><Sparkles aria-hidden="true" /><strong>سهل</strong><span>ذاكرة مشروعك</span></div>
            <div className="stripe-app-orbit">
              {integrations.map((app, index) => <span key={app} className={`app-${index + 1}`}><Link2 aria-hidden="true" />{app}</span>)}
            </div>
          </div>
          <ArrowLink to="/integrations">استكشف كل التكاملات</ArrowLink>
        </div>
      </section>

      <section className="stripe-product" id="product">
        <div className="stripe-shell">
          <header className="stripe-section-heading">
            <p>شاهد المنتج، لا الوعد</p>
            <h2>كل الفريق أمامك.<br />وكل قرار في يدك.</h2>
          </header>
          <ProductConsole />
        </div>
      </section>

      <section className="stripe-use-cases">
        <div className="stripe-shell">
          <header className="stripe-section-heading">
            <p>مصمم لطريقة عملك</p>
            <h2>فريق واحد، وسياق مختلف لكل مشروع.</h2>
          </header>
          <div className="stripe-use-grid">
            <Link to="/use-cases/ecommerce"><span>المتاجر الإلكترونية</span><h3>محتوى، حملات، دعم ومتابعة مبيعات.</h3><ArrowLeft /></Link>
            <Link to="/use-cases/restaurants"><span>المطاعم والكافيهات</span><h3>حضور محلي مستمر وردود لا تتأخر.</h3><ArrowLeft /></Link>
            <Link to="/use-cases/clinics"><span>العيادات</span><h3>تنظيم المواعيد ومحتوى يبني الثقة.</h3><ArrowLeft /></Link>
            <Link to="/use-cases/realestate"><span>العقار والمقاولات</span><h3>فرص مؤهلة وعروض جاهزة للمتابعة.</h3><ArrowLeft /></Link>
          </div>
        </div>
      </section>

      <section className="stripe-pricing" id="pricing">
        <div className="stripe-shell">
          <header className="stripe-section-heading is-wide">
            <p>ابدأ بحجمك اليوم</p>
            <h2>موظف واحد أو الفريق كله.<br />بدون تعقيد التوظيف.</h2>
          </header>
          <div className="stripe-plan-grid">
            {plans.map((plan) => (
              <article key={plan.id} className={plan.highlight ? "is-highlight" : ""}>
                <p>{plan.tag}</p><h3>{plan.name}</h3>
                <div className="stripe-price">{plan.monthly ? <><strong>{plan.monthly.toLocaleString("ar-SA")}</strong><span>ر.س<br /><small>شهرياً</small></span></> : <strong className="is-text">حسب الطلب</strong>}</div>
                <p className="stripe-plan-description">{plan.desc}</p>
                <ul>{plan.perks.slice(0, 4).map((perk) => <li key={perk}><Check aria-hidden="true" />{perk}</li>)}</ul>
                <Link to={plan.monthly ? "/auth" : "/contact"} search={plan.monthly ? { mode: "signup" as const } : undefined}>{plan.cta}<ArrowLeft /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stripe-faq" id="faq">
        <div className="stripe-shell stripe-faq-grid">
          <header className="stripe-section-heading"><p>إجابات واضحة</p><h2>قبل أن توظّف فريقك.</h2><span>لم تجد إجابتك؟ تواصل معنا وسنشرح لك ما يناسب مشروعك.</span></header>
          <Accordion type="single" collapsible className="stripe-faq-list">
            {faqs.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger>{item.q}</AccordionTrigger><AccordionContent>{item.a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <section className="stripe-final">
        <div className="stripe-spectrum" aria-hidden="true"><i /><i /><i /></div>
        <div className="stripe-shell stripe-final-grid">
          <div><p>جاهز ليبدأ الفريق؟</p><h2>حوّل قائمة المهام<br />إلى نتائج مكتملة.</h2></div>
          <div><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ ١٤ يوماً مجاناً <ArrowLeft /></Link><span><Clock3 aria-hidden="true" /> الإعداد الأول يستغرق دقائق</span></div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}