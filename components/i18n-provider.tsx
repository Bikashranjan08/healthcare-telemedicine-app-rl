"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Locale = "en" | "hi" | "pa" | "or"

type Dict = Record<
  Locale,
  {
    nav: {
      home: string
      about: string
      services: string
      doctors: string
      blog: string
      contact: string
      login: string
    }
    hero: {
      title: string
      subtitle: string
      book: string
      sos: string
    }
    how: { title: string; steps: string[] }
    services: { title: string; items: string[] }
    doctors: { title: string }
    testimonials: { title: string }
    footer: { rights: string }
  }
>

const dict: Dict = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      doctors: "Find a Doctor",
      blog: "Health Blog",
      contact: "Contact",
      login: "Login / Register",
    },
    hero: {
      title: "Quality Healthcare, Right at Your Fingertips.",
      subtitle: "Connect with Doctors and ASHA workers instantly.",
      book: "Book an Appointment",
      sos: "Emergency SOS",
    },
    how: { title: "How it works", steps: ["Register", "Find Your Doctor", "Start Consultation"] },
    services: {
      title: "Our Services",
      items: [
        "Video Consultations",
        "Symptom Checker",
        "Medical Records",
        "Medicine Reminders",
        "Medicine Availability",
        "Emergency Mode",
        "Hospital Navigation",
      ],
    },
    doctors: { title: "Meet Our Doctors" },
    testimonials: { title: "What patients say" },
    footer: { rights: "All rights reserved." },
  },
  hi: {
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      services: "सेवाएँ",
      doctors: "डॉक्टर खोजें",
      blog: "हेल्थ ब्लॉग",
      contact: "संपर्क",
      login: "लॉगिन / रजिस्टर",
    },
    hero: {
      title: "गुणवत्तापूर्ण स्वास्थ्य सेवा, आपकी उंगलियों पर।",
      subtitle: "डॉक्टरों और आशा कार्यकर्ताओं से तुरंत जुड़ें।",
      book: "अपॉइंटमेंट बुक करें",
      sos: "आपातकालीन SOS",
    },
    how: { title: "कैसे काम करता है", steps: ["रजिस्टर करें", "डॉक्टर ढूंढें", "कंसल्टेशन शुरू करें"] },
    services: {
      title: "हमारी सेवाएँ",
      items: [
        "वीडियो कंसल्टेशन",
        "लक्षण चेकर",
        "मेडिकल रिकॉर्ड",
        "दवा रिमाइंडर",
        "दवा उपलब्धता",
        "आपातकालीन मोड",
        "अस्पताल नेविगेशन",
      ],
    },
    doctors: { title: "हमारे डॉक्टर" },
    testimonials: { title: "मरीज़ क्या कहते हैं" },
    footer: { rights: "सर्वाधिकार सुरक्षित।" },
  },
  pa: {
    nav: {
      home: "ਹੋਮ",
      about: "ਸਾਡੇ ਬਾਰੇ",
      services: "ਸੇਵਾਵਾਂ",
      doctors: "ਡਾਕਟਰ ਲੱਭੋ",
      blog: "ਹੈਲਥ ਬਲੋਗ",
      contact: "ਸੰਪਰਕ",
      login: "ਲਾਗਇਨ / ਰਜਿਸਟਰ",
    },
    hero: {
      title: "ਗੁਣਵੱਤਾ ਵਾਲੀ ਸਿਹਤ ਸੇਵਾ, ਤੁਹਾਡੇ ਹੱਥਾਂ ਵਿੱਚ।",
      subtitle: "ਡਾਕਟਰਾਂ ਅਤੇ ਆਸ਼ਾ ਵਰਕਰਾਂ ਨਾਲ ਤੁਰੰਤ ਜੁੜੋ।",
      book: "ਅਪਾਇਂਟਮੈਂਟ ਬੁੱਕ ਕਰੋ",
      sos: "ਐਮਰਜੈਂਸੀ SOS",
    },
    how: { title: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ", steps: ["ਰਜਿਸਟਰ ਕਰੋ", "ਡਾਕਟਰ ਲੱਭੋ", "ਕੰਸਲਟੇਸ਼ਨ ਸ਼ੁਰੂ ਕਰੋ"] },
    services: {
      title: "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ",
      items: [
        "ਵੀਡੀਓ ਕਨਸਲਟੇਸ਼ਨ",
        "ਲੱਛਣ ਚੈਕਰ",
        "ਮੈਡੀਕਲ ਰਿਕਾਰਡ",
        "ਦਵਾਈ ਯਾਦ ਦਹਿਲਾਉਣ ਵਾਲੇ",
        "ਦਵਾਈ ਉਪਲਬਧਤਾ",
        "ਐਮਰਜੈਂਸੀ ਮੋਡ",
        "ਹਸਪਤਾਲ ਨੇਵੀਗੇਸ਼ਨ",
      ],
    },
    doctors: { title: "ਸਾਡੇ ਡਾਕਟਰ" },
    testimonials: { title: "ਮਰੀਜ਼ ਕੀ ਕਹਿੰਦੇ ਹਨ" },
    footer: { rights: "ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।" },
  },
  or: {
    nav: {
      home: "ହୋମ",
      about: "ଆମ ବିଷୟରେ",
      services: "ସେବା",
      doctors: "ଡକ୍ତର ଖୋଜନ୍ତୁ",
      blog: "ହେଲ୍ଥ ବ୍ଲଗ୍",
      contact: "ଯୋଗାଯୋଗ",
      login: "ଲଗଇନ / ରେଜିଷ୍ଟର",
    },
    hero: {
      title: "ଗୁଣସ୍ତରୀୟ ସ୍ୱାସ୍ଥ୍ୟସେବା, ଆପଣଙ୍କ ହାତରେ।",
      subtitle: "ଡକ୍ତର ଏବଂ ASHA କର୍ମୀଙ୍କ ସହିତ ସତ୍ୟକ୍ଷଣରେ ଯୋଡ଼ନ୍ତୁ।",
      book: "ନିୟୋଜନ ବୁକ୍ କରନ୍ତୁ",
      sos: "ଜରୁରି SOS",
    },
    how: { title: "କିପରି କାମ କରେ", steps: ["ରେଜିଷ୍ଟର", "ଡକ୍ତର ଖୋଜନ୍ତୁ", "ପରାମର୍ଶ ଆରମ୍ଭ କରନ୍ତୁ"] },
    services: {
      title: "ଆମ ସେବା",
      items: ["ଭିଡିଓ ପରାମର୍ଶ", "ଲକ୍ଷଣ ଯାଞ୍ଚକାରୀ", "ମେଡିକାଲ ରେକର୍ଡ", "ଔଷଧ ମନେପକାଇବା", "ଔଷଧ ଉପଲବ୍ଧତା", "ଜରୁରି ମୋଡ୍", "ହସ୍ପିଟାଲ ନେଭିଗେସନ୍"],
    },
    doctors: { title: "ଆମ ଡକ୍ତରମାନେ" },
    testimonials: { title: "ରୋଗୀମାନେ କଣ କହୁଛନ୍ତି" },
    footer: { rights: "ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।" },
  },
}

type I18nContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dict[Locale]
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const stored = localStorage.getItem("ssc-locale") as Locale | null
    if (stored) setLocaleState(stored)
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem("ssc-locale", l)
  }

  const t = useMemo(() => dict[locale], [locale])

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
