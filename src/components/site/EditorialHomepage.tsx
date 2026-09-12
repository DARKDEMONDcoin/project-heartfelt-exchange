import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  CheckCircle2,
  Clock3,
  Link2,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { Portrait } from "@/components/site/Portrait";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { team } from "@/data/team";
import { faqs } from "@/components/site/Faq";

const workday = [
  { time: "٧:٠٠ ص", member: "أمَل", id: "eva", task: "رتّبت بريدك، لخصت المهم، وجهزت يومك قبل أول قهوة." },
  { time: "٩:٣٠ ص", member: "سالم", id: "sam", task: "وجد ٣٢ عميلاً مناسباً، وبدأ محادثات مخصصة مع كل واحد." },
  { time: "١٢:٠٠ م", member: "نور", id: "nour", task: "سلّمت مقالاً محسّناً للبحث، جاهزاً للنشر على موقعك." },
  { time: "٣:٢٠ م", member: "دانة", id: "dana", task: "حوّلت العرض الجديد إلى ستة مقاسات متسقة مع هويتك." },
  { time: "٦:٤٥ م", member: "سِراج", id: "sonny", task: "نشر المحتوى في أفضل توقيت وبدأ الرد على التعليقات." },
  { time: "١١:٠٠ م", member: "آدم", id: "adam", task: "جمع نتائج اليوم وحدد ما يستحق أن تضاعف ميزانيته غداً." },
];

const proof = [
  { value: "١٢", label: "ساعة عمل يوفرها الفريق أسبوعياً", note: "في إدارة البريد والمواعيد وحدها" },
  { value: "٧", label: "منصات يديرها سِراج من مكان واحد", note: "من التخطيط حتى النشر والمتابعة" },
  { value: "١٥", label: "مصدر بيانات يراقبها آدم", note: "لتصل إليك القرارات، لا ضوضاء الأرقام" },
];

const testimonials = [
  { quote: "أمَل بتفلتر بريدي الصبح وتخليني أبدأ يومي بقرارات، مش برسايل.", name: "ليلى بن عمر", role: "استشارية تسويق" },
  { quote: "الفريق بيشتغل بالليل وأنا نايمة، وأصحى ألاقي الخطة جاهزة للمراجعة.", name: "سارة العتيبي", role: "عيادة تجميل" },
  { quote: "الصور بالنص العربي كانت مشكلتي الأكبر — هنا اتحلّت بالكامل.", name: "خالد المرزوقي", role: "وكالة إعلانات" },
];

const integrations = ["إنستقرام", "لينكدإن", "واتساب", "جيميل", "شوبيفاي", "ووردبريس", "Google Analytics", "Notion"];

function Chapter({ number, title, kicker }: { number: string; title: string; kicker: string }) {
  return (
    <header className="editorial-chapter">
      <span className="editorial-chapter-number">{number}</span>
      <div>
        <p>{kicker}</p>
        <h2>{title}</h2>
      </div>
    </header>
  );
}

function LiveWorkspace() {
  const [selected, setSelected] = useState(0);
  const [approved, setApproved] = useState(false);
  const member = team[selected];

  if (!member) return null;

  return (
    <div className="editorial-workspace" aria-label="معاينة مساحة عمل سهل">
      <div className="editorial-workspace-top">
        <strong>مساحة عمل سهل</strong>
        <span><i /> الفريق يعمل الآن</span>
      </div>
      <div className="editorial-workspace-grid">
        <div className="editorial-workspace-team" aria-label="اختر موظفاً">
          {team.map((person, index) => (
            <Button
              key={person.id}
              type="button"
              variant="ghost"
              onClick={() => { setSelected(index); setApproved(false); }}
              className={selected === index ? "is-active" : ""}
              aria-pressed={selected === index}
            >
              <Portrait memberId={person.id} name={person.name} eager={index < 2} />
              <span><strong>{person.name}</strong><small>{person.role}</small></span>
            </Button>
          ))}
        </div>
        <div className="editorial-conversation">
          <div className="editorial-message is-owner">ما أهم شيء تقدر تنجزه لي اليوم؟</div>
          <div className="editorial-message is-agent">
            <header>
              <Portrait memberId={member.id} name={member.name} eager />
              <span><strong>{member.name}</strong><small>{member.role}</small></span>
            </header>
            <p>{member.tagline}. سأجهز النتيجة وأضعها هنا لتراجعها قبل التنفيذ.</p>
          </div>
        </div>
        <aside className="editorial-approval">
          <p><Sparkles aria-hidden="true" /> جاهز للمراجعة</p>
          <div>
            <span className="editorial-output-label">مهمة اليوم</span>
            <strong>{member.tasks[0]}</strong>
            <small>تم إعدادها وفق هوية مشروعك ونبرة علامتك.</small>
            <Button type="button" onClick={() => setApproved(true)} disabled={approved}>
              {approved ? <><Check aria-hidden="true" /> تمت الموافقة</> : <>موافقة وتنفيذ <ArrowLeft aria-hidden="true" /></>}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function EditorialHomepage() {
  const [activeMoment, setActiveMoment] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveMoment((current) => (current + 1) % workday.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="editorial-hero" aria-labelledby="home-title">
        <div className="editorial-hero-copy">
          <p className="editorial-edition">سهل — فريق العمل العربي بالذكاء الاصطناعي</p>
          <h1 id="home-title">مشروعك لا يحتاج منك<br />أن تقوم <em>بكل شيء.</em></h1>
          <p className="editorial-hero-lead">وظّف فريقاً من ستة موظفين رقميين يكتب ويصمّم ويبيع وينظّم ويحلّل — بالعربية، وعلى مدار الساعة.</p>
          <div className="editorial-actions">
            <Link to="/auth" search={{ mode: "signup" as const }} className="editorial-primary-action">
              وظّف فريقك مجاناً <ArrowLeft aria-hidden="true" />
            </Link>
            <a href="#live-workspace" className="editorial-text-action">شاهدهم يعملون <ArrowUpLeft aria-hidden="true" /></a>
          </div>
          <p className="editorial-trust"><CheckCircle2 aria-hidden="true" /> ١٤ يوماً مجاناً · بدون بطاقة · ألغِ في أي وقت</p>
        </div>
        <div className="editorial-hero-portraits" aria-label="فريق سهل">
          {team.map((member, index) => (
            <Link key={member.id} to="/employees/$id" params={{ id: member.id }} className={`editorial-hero-person person-${index + 1}`}>
              <span className="editorial-person-index">٠{index + 1}</span>
              <Portrait memberId={member.id} name={member.name} eager={index < 3} />
              <span className="editorial-person-caption"><strong>{member.name}</strong><small>{member.role}</small></span>
            </Link>
          ))}
        </div>
        <div className="editorial-scroll-note"><span /> مرّر لتبدأ الحكاية</div>
      </section>

      <section className="editorial-pressure">
        <div className="editorial-section-shell">
          <Chapter number="٠١" kicker="قبل سهل" title="كل شيء ينتظر منك شيئاً." />
          <div className="editorial-pressure-layout">
            <p className="editorial-pressure-statement">تبدأ يومك بردٍ سريع. تنتهي منه بعد عشرات الرسائل، ومنشور لم يُكتب، وعميل لم يُتابع، وأرقام لم تُقرأ.</p>
            <ol className="editorial-pressure-list">
              <li><time>٨:١٠</time><span>٤١ رسالة تنتظر الرد</span></li>
              <li><time>١١:٣٥</time><span>الخطة التسويقية ما زالت فارغة</span></li>
              <li><time>٣:٢٠</time><span>ثلاث فرص بيع بلا متابعة</span></li>
              <li><time>٨:٤٥</time><span>التقرير مؤجل إلى الغد — مرة أخرى</span></li>
            </ol>
          </div>
          <div className="editorial-breakline"><span>كفاية شغل لوحدك.</span><p>احتفظ بالقرارات التي تحتاجك. واترك الباقي لفريق يعرف مشروعك.</p></div>
        </div>
      </section>

      <section className="editorial-team" id="team">
        <div className="editorial-section-shell">
          <Chapter number="٠٢" kicker="الفريق" title="ستة تخصصات. مكان عمل واحد." />
          <div className="editorial-team-list">
            {team.map((member, index) => (
              <article key={member.id} className="editorial-dossier">
                <div className="editorial-dossier-number">٠{index + 1}</div>
                <div className="editorial-dossier-photo"><Portrait memberId={member.id} name={member.name} /></div>
                <div className="editorial-dossier-copy">
                  <p>{member.role}</p>
                  <h3>{member.name}</h3>
                  <strong>{member.title}</strong>
                  <span>{member.summary}</span>
                  <Link to="/employees/$id" params={{ id: member.id }}>افتح ملف {member.name} <ArrowLeft aria-hidden="true" /></Link>
                </div>
                <dl className="editorial-dossier-metrics">
                  {member.metrics.slice(0, 2).map((metric) => <div key={metric.k}><dt>{metric.k}</dt><dd>{metric.v}</dd></div>)}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-day">
        <div className="editorial-section-shell">
          <Chapter number="٠٣" kicker="يومك الجديد" title="أنت تمضي في يومك. وهم يمضون في العمل." />
          <div className="editorial-day-grid">
            <div className="editorial-day-focus">
              <time>{workday[activeMoment]?.time}</time>
              <Portrait memberId={workday[activeMoment]?.id ?? "eva"} name={workday[activeMoment]?.member ?? "أمَل"} />
              <p><strong>{workday[activeMoment]?.member}</strong> {workday[activeMoment]?.task}</p>
            </div>
            <ol className="editorial-timeline">
              {workday.map((moment, index) => (
                <li key={moment.time} className={activeMoment === index ? "is-active" : ""}>
                  <Button type="button" variant="ghost" onClick={() => setActiveMoment(index)} aria-pressed={activeMoment === index}>
                    <time>{moment.time}</time><span>{moment.member}</span><p>{moment.task}</p>
                  </Button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="editorial-proof">
        <div className="editorial-section-shell">
          <Chapter number="٠٤" kicker="الفرق في الأرقام" title="العمل يخرج من قائمة انتظارك." />
          <div className="editorial-proof-grid">
            {proof.map((item) => <article key={item.value}><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.note}</p></article>)}
          </div>
          <div className="editorial-quotes">
            {testimonials.map((item, index) => (
              <figure key={item.name} className={index === 0 ? "is-featured" : ""}>
                <blockquote>«{item.quote}»</blockquote>
                <figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-live" id="live-workspace">
        <div className="editorial-section-shell">
          <Chapter number="٠٥" kicker="داخل المنتج" title="لا تتخيلهم. شاهدهم يعملون." />
          <p className="editorial-section-intro">كل موظف يعرف دوره، يسلم المهمة للموظف التالي، ولا ينفذ شيئاً حساساً قبل موافقتك.</p>
          <LiveWorkspace />
        </div>
      </section>

      <section className="editorial-connections">
        <div className="editorial-section-shell">
          <Chapter number="٠٦" kicker="متصل بأدواتك" title="الفريق يعمل حيث يعمل مشروعك." />
          <div className="editorial-connections-layout">
            <p>اربط حساباتك مرة واحدة. بعدها يقرأ الفريق السياق، ينجز العمل، ويترك لك القرار النهائي.</p>
            <div className="editorial-apps">{integrations.map((app) => <span key={app}><Link2 aria-hidden="true" />{app}</span>)}</div>
          </div>
          <Link to="/integrations" className="editorial-inline-link">شاهد كل التكاملات <ArrowLeft aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="editorial-hire" id="pricing">
        <div className="editorial-section-shell">
          <Chapter number="٠٧" kicker="قرار التوظيف" title="ابدأ بما تحتاجه اليوم." />
          <div className="editorial-hire-grid">
            <article>
              <p>موظف واحد</p><h3>البداية</h3><strong><b>١٤٩</b> ر.س <small>/ شهرياً</small></strong>
              <span>اختر موظفاً رقمياً واحداً يبدأ العمل اليوم.</span>
              <ul><li><Check /> ٦٠ مهمة شهرياً</li><li><Check /> ٣ حسابات مرتبطة</li><li><Check /> تقرير أسبوعي</li></ul>
              <Link to="/auth" search={{ mode: "signup" as const }}>ابدأ ١٤ يوماً مجاناً <ArrowLeft /></Link>
            </article>
            <article className="is-team">
              <p>الفريق الكامل — الأكثر اختياراً</p><h3>النمو</h3><strong><b>٣٩٩</b> ر.س <small>/ شهرياً</small></strong>
              <span>الموظفون الستة مع مسارات عمل تلقائية بينهم.</span>
              <ul><li><Check /> ١٠٠٠ مهمة شهرياً</li><li><Check /> حسابات غير محدودة</li><li><Check /> دعم أولوية</li></ul>
              <Link to="/auth" search={{ mode: "signup" as const }}>وظّف الفريق مجاناً <ArrowLeft /></Link>
            </article>
          </div>
          <p className="editorial-enterprise">تدير فروعاً أو علامات متعددة؟ <Link to="/contact">تحدث معنا عن باقة المؤسسات</Link></p>
        </div>
      </section>

      <section className="editorial-faq" id="faq">
        <div className="editorial-section-shell editorial-faq-layout">
          <Chapter number="٠٨" kicker="قبل أن تبدأ" title="أسئلة تستحق إجابة واضحة." />
          <Accordion type="single" collapsible className="editorial-faq-list">
            {faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="editorial-final">
        <div className="editorial-section-shell">
          <p>غداً، يمكن أن تبدأ يومك بالقرارات.</p>
          <h2>والعمل الروتيني؟<br /><em>سيكون قد انتهى.</em></h2>
          <Link to="/auth" search={{ mode: "signup" as const }}>ابدأ مع فريق سهل <ArrowLeft aria-hidden="true" /></Link>
          <span><Clock3 aria-hidden="true" /> الإعداد الأول يستغرق دقائق</span>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}