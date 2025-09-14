import { Artwork } from "@shared/schema";

// Generate placeholder artworks for each category
export function generatePlaceholderArtworks(): Artwork[] {
  const categories = ["brochure", "popup", "sculpture", "cubism", "thaipop"] as const;
  const artworks: Artwork[] = [];

  const imageUrls = [
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1594736797933-d0beedb4072d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  ];

  const artworkNames = {
    brochure: [
      "แนวทางอาชีพศิลปิน", "ใครเป็นศิลปิน", "ศิลปะเพื่อชีวิต", "เส้นทางสู่ความสำเร็จ", "โอกาสในวงการศิลป์",
      "การเป็นนักออกแบบ", "ผู้สร้างสรรค์", "ศิลปะร่วมสมัย", "เทคนิคใหม่", "แรงบันดาลใจ"
    ],
    popup: [
      "หนังสือป๊อปอัพ", "โลกสามมิติ", "เรื่องเล่าแบบใหม่", "กลไกกระดาษ", "ปาฏิหาริย์กระดาษ",
      "สวนป๊อปอัพ", "เมืองในหนังสือ", "โครงสร้างซับซ้อน", "วิศวกรรมกระดาษ", "ศิลปะเคลื่อนไหว"
    ],
    sculpture: [
      "รูปทรงนามธรรม", "ประติมากรรมสมัยใหม่", "โลหะและหิน", "ความงามของวัสดุ", "การปั้นแห่งอนาคต",
      "ความเคลื่อนไหวแท้", "สถาปัตยกรรมขนาดเล็ก", "รูปลักษณ์ใหม่", "ความหมายลึกซึ้ง", "ศิลปะมิติสาม"
    ],
    cubism: [
      "ใบหน้าเรขาคณิต", "มุมมองหลากหลาย", "การแยกส่วน", "รูปทรงเหลี่ยม", "การตีความใหม่",
      "ศิลปะแนวคิด", "มิติแห่งความจริง", "รูปแบบใหม่", "การวิเคราะห์", "โครงสร้างใหม่"
    ],
    thaipop: [
      "วัดป๊อปอาร์ต", "ร้านข้าวผัดป๊อป", "วัฒนธรรมไทยใหม่", "สีสันแห่งเมือง", "ตลาดน้ำป๊อป",
      "เทศกาลสงกรานต์", "ยักษ์สีสด", "ไหว้พระป๊อป", "อาหารไทยยุคใหม่", "ประเพณีใหม่"
    ]
  };

  const artistNames = [
    "สมชาย วงศ์ใหญ่", "นิตยา ใจดี", "วิชัย สีสด", "พิมพ์ใจ กระดาษ", "ดีไซน์ ใหม่",
    "อาหาร สีสัน", "ศิลป์ ใจเย็น", "งาม นาม", "สร้าง สรรค์", "แต่ง รูป",
    "คิด ใหม่", "ทำ ดี", "เก่ง จริง", "เป็น เอง", "มี ใจ",
    "รัก ศิลป์", "ฝัน ดี", "คิด เพื่อ", "ทำ เป็น", "ให้ ไป"
  ];

  const concepts = [
    "การแสดงออกถึงความเป็นไทยในยุคใหม่ผ่านศิลปะร่วมสมัย",
    "การผสมผสานระหว่างประเพณีและความทันสมัยในผลงานศิลปะ",
    "การตีความวัฒนธรรมไทยผ่านมุมมองของศิลปินรุ่นใหม่",
    "การสร้างสรรค์ผลงานที่สะท้อนสังคมไทยในปัจจุบัน",
    "การใช้สีสันและรูปทรงเพื่อสื่อความหมายเชิงสัญลักษณ์",
    "การศึกษาธรรมชาติและนำมาประยุกต์ในงานศิลปะ",
    "การแสวงหาความงามในสิ่งธรรมดาของชีวิตประจำวัน",
    "การทดลองด้วยวัสดุและเทคนิคใหม่ๆ ในการสร้างสรรค์"
  ];

  categories.forEach((category, categoryIndex) => {
    for (let i = 0; i < 40; i++) {
      const id = `${category}-${i + 1}`;
      const title = artworkNames[category][i % artworkNames[category].length] + ` ${Math.floor(i / artworkNames[category].length) + 1}`;
      const artist = artistNames[(categoryIndex * 40 + i) % artistNames.length];
      const concept = concepts[i % concepts.length];
      const image = imageUrls[i % imageUrls.length];
      
      artworks.push({
        id,
        title,
        artist,
        category,
        concept,
        image,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
  });

  return artworks;
}

export function getBestArtworks(): Artwork[] {
  const allArtworks = generatePlaceholderArtworks();
  
  // Return first artwork from each category as "best works"
  const bestWorks = [
    allArtworks.find(a => a.category === "thaipop")!,
    allArtworks.find(a => a.category === "sculpture")!,
    allArtworks.find(a => a.category === "cubism")!,
    allArtworks.find(a => a.category === "popup")!,
    allArtworks.find(a => a.category === "brochure")!
  ];

  return bestWorks;
}
