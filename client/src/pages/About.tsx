export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            เกี่ยวกับนิทรรศการ
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            ค้นพบเรื่องราวและจุดประสงค์ของนิทรรศการ
          </p>
        </div>

        {/* Content */}
        <div className="bg-card p-8 md:p-12 rounded-lg border border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
            นิทรรศการศิลปะออนไลน์: ความงามในยุคดิจิทัล
          </h2>
          
          <div className="prose prose-lg max-w-none text-card-foreground space-y-8">
            <p className="text-lg leading-relaxed">
              นิทรรศการออนไลน์แห่งนี้เป็นการรวบรวมผลงานศิลปะจากศิลปินชั้นนำทั้งในและต่างประเทศ 
              โดยมีจุดประสงค์เพื่อส่งเสริมและเผยแพร่ศิลปะไทยสู่สายตาชาวโลก 
              ผ่านเทคโนโลยีดิจิทัลที่ทำให้ทุกคนสามารถเข้าถึงความงามได้อย่างไร้ขีดจำกัด
            </p>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">หมวดหมู่ผลงาน</h3>
              <ul className="space-y-3 pl-6">
                <li className="list-disc">
                  <strong className="text-foreground">แผ่นพับ อาชีพทัศนศิลป์:</strong> 
                  <span className="ml-2">ผลงานดีไซน์และกราฟิกที่นำเสนอข้อมูลเกี่ยวกับอาชีพทางศิลปะ</span>
                </li>
                <li className="list-disc">
                  <strong className="text-foreground">Pop-up:</strong> 
                  <span className="ml-2">ศิลปะมิติสามที่โต้ตอบได้ และงานหัตถกรรมกระดาษ</span>
                </li>
                <li className="list-disc">
                  <strong className="text-foreground">ประติมากรรม:</strong> 
                  <span className="ml-2">งานแกะสลักและปั้นในรูปแบบต่างๆ</span>
                </li>
                <li className="list-disc">
                  <strong className="text-foreground">Cubism Art:</strong> 
                  <span className="ml-2">ผลงานจิตรกรรมในสไตล์คิวบิสม์</span>
                </li>
                <li className="list-disc">
                  <strong className="text-foreground">Thai Pop Art:</strong> 
                  <span className="ml-2">ศิลปะป๊อปที่ผสมผสานกับวัฒนธรรมไทย</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">วิสัยทัศน์</h3>
              <p className="leading-relaxed">
                เราเชื่อว่าศิลปะเป็นภาษาสากลที่สามารถเชื่อมโยงใจคนทั่วโลก 
                นิทรรศการนี้มุ่งหวังที่จะเป็นสะพานเชื่อมระหว่างศิลปินและผู้ชม 
                ระหว่างประเพณีและความทันสมัย ระหว่างไทยและโลก
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">การมีส่วนร่วม</h3>
              <p className="leading-relaxed">
                นิทรรศการนี้เปิดโอกาสให้ศิลปินและผู้สนใจสามารถส่งผลงานของตนเองมาร่วมแสดงได้ 
                ผ่านระบบการอัปโหลดผลงานที่ได้รับการออกแบบมาเพื่อความสะดวกและง่ายต่อการใช้งาน 
                เราต้องการให้นี่เป็นพื้นที่ที่ทุกคนสามารถแบ่งปันความงามและความคิดสร้างสรรค์ได้อย่างเสรี
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">เทคโนโลยีและนวัตกรรม</h3>
              <p className="leading-relaxed">
                นิทรรศการออนไลน์นี้ใช้เทคโนโลยีเว็บที่ทันสมัยเพื่อให้ผู้เยียมชมได้รับประสบการณ์ที่ดีที่สุด 
                ไม่ว่าจะเป็นการแสดงผลงานในคุณภาพสูง การค้นหาและจัดหมวดหมู่ที่ง่ายดาย 
                และระบบการจัดเก็บข้อมูลที่ปลอดภัย
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">ติดต่อเรา</h3>
              <p className="leading-relaxed">
                หากคุณมีคำถามเกี่ยวกับนิทรรศการ หรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับการส่งผลงาน 
                สามารถติดต่อเราได้ผ่านช่องทางต่างๆ ที่แสดงไว้ในเว็บไซต์
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
