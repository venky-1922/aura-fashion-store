// Curated gym, training and technical-apparel photography from Unsplash.
// These are shared by the product catalogue and editorial modules so the site
// keeps one consistent performance-focused visual direction.
export const img = (id: string, w = 1200, q = 80) => {
  void w;
  void q;
  return `/images/catalog/${id}.jpg`;
};

export const PH = {
  heroMain: "photo-1509631179647-0177331693ae",
  heroSecondary: "photo-1605296867304-46d5465a13f1",
  editorialWide: "photo-1534438327276-14e5300c3a48",
  editorialWide2: "photo-1571902943202-507ec2618e8f",
  brandStatement: "photo-1517836357463-d25dfeac3438",
  collectionSpotlight: "photo-1581009146145-b5ef050c2e1e",
  community1: "photo-1518611012118-696072aa579a",
  community2: "photo-1599058917212-d750089bc07e",
  community3: "photo-1538805060514-97d9cc17730c",
  community4: "photo-1574680096145-d05b474e2155",
  community5: "photo-1593079831268-3381b0db4a77",
  community6: "photo-1583454110551-21f2fa2afe61",

  catMen: "photo-1581009146145-b5ef050c2e1e",
  catWomen: "photo-1518611012118-696072aa579a",
  catFootwear: "photo-1542291026-7eec264c27ff",
  catAccessories: "photo-1554284126-aa88f22d8b74",

  p1a: "photo-1574680096145-d05b474e2155",
  p1b: "photo-1538805060514-97d9cc17730c",
  p2a: "photo-1605296867304-46d5465a13f1",
  p2b: "photo-1517836357463-d25dfeac3438",
  p3a: "photo-1581009146145-b5ef050c2e1e",
  p3b: "photo-1571902943202-507ec2618e8f",
  p4a: "photo-1549298916-b41d501d3772",
  p4b: "photo-1490114538077-0a7f8cb49891",
  p5a: "photo-1542291026-7eec264c27ff",
  p5b: "photo-1571902943202-507ec2618e8f",
  p6a: "photo-1518611012118-696072aa579a",
  p6b: "photo-1599058917212-d750089bc07e",
  p7a: "photo-1538805060514-97d9cc17730c",
  p7b: "photo-1518611012118-696072aa579a",
  p8a: "photo-1517836357463-d25dfeac3438",
  p8b: "photo-1593079831268-3381b0db4a77",
  p9a: "photo-1574680096145-d05b474e2155",
  p9b: "photo-1583454110551-21f2fa2afe61",
  p10a: "photo-1599058917212-d750089bc07e",
  p10b: "photo-1534438327276-14e5300c3a48",
} as const;
