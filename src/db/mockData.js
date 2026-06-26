export const fukuokaTripData = {
  title: "2026 暑假日本福岡家庭旅遊",
  dates: "2026-06-27 (六) ~ 2026-07-03 (五)",
  members: ["自己", "旅伴A", "旅伴B", "旅伴C"],
  days: [
    {
      dayNum: 1,
      date: "6/27 (六)",
      title: "抵達福岡與車站探索",
      hotel: "Amistad Hotel Fukuoka",
      spots: [
        {
          time: "08:00",
          name: "林口出發往桃園機場",
          desc: "搭車前往桃園國際機場第一航廈，準備搭乘亞洲航空 AK1510 班機。",
          lat: 25.0797,
          lng: 121.2342,
          iconType: "airport"
        },
        {
          time: "12:00 -> 15:20",
          name: "搭機往福岡機場",
          desc: "亞洲航空（AirAsia）AK1510 班機起飛，航程約 2 小時 20 分鐘抵達福岡機場。",
          lat: 33.5859,
          lng: 130.4507,
          iconType: "airport"
        },
        {
          time: "16:00",
          name: "抵達福岡機場並領取 JR Pass",
          desc: "辦理入境，於機場櫃檯領取預購的北九州 JR Pass 三日周遊券，隨後搭乘計程車前往酒店。",
          lat: 33.5859,
          lng: 130.4507,
          iconType: "taxi"
        },
        {
          time: "16:30",
          name: "Amistad Hotel Fukuoka 入住",
          desc: "辦理 Check-in 並放妥大件行李，稍作休息。",
          lat: 33.5823,
          lng: 130.4172,
          iconType: "hotel"
        },
        {
          time: "17:30",
          name: "博多車站劃位與晚餐購物",
          desc: "步行前往博多車站（約8分鐘），進行 JR Pass 三日券劃位，並在車站周邊享用晚餐與採購日常用品。",
          lat: 33.5897,
          lng: 130.4208,
          iconType: "shopping"
        }
      ]
    },
    {
      dayNum: 2,
      date: "6/28 (日)",
      title: "關門海峽、門司港與小倉巡禮",
      hotel: "Amistad Hotel Fukuoka",
      spots: [
        {
          time: "08:30",
          name: "搭特急音速號前往小倉與門司港",
          desc: "持 JR Pass 搭乘特急音速號（Sonic）至小倉站，隨後轉乘普通列車前往門司港。抵達後購買關門海峽四葉草車票。",
          lat: 33.5897,
          lng: 130.4208,
          iconType: "train"
        },
        {
          time: "10:00",
          name: "門司港小火車「潮風號」",
          desc: "搭乘復古觀光小火車潮風號，沿途欣賞門司港懷舊街區的港灣風光。",
          lat: 33.9442,
          lng: 130.9634,
          iconType: "sightseeing"
        },
        {
          time: "10:30",
          name: "關門海峽海底人行隧道",
          desc: "挑戰跨越海底隧道，全長 780 公尺，中途跨越福岡縣與山口縣的分界線。",
          lat: 33.9620,
          lng: 130.9579,
          iconType: "sightseeing"
        },
        {
          time: "11:30",
          name: "唐戶市場海鮮大餐與赤間神宮",
          desc: "搭巴士前往唐戶市場，享用新鮮美味的海鮮與握壽司，隨後順遊赤間神宮及日清講和紀念館。",
          lat: 33.9575,
          lng: 130.9478,
          iconType: "restaurant"
        },
        {
          time: "13:30",
          name: "關門連絡船 (渡輪) 返回門司港",
          desc: "搭乘渡輪吹海風，跨海回到門司港懷舊街區散步，欣賞舊門司稅關等歷史建築。",
          lat: 33.9575,
          lng: 130.9478,
          iconType: "ferry"
        },
        {
          time: "15:00",
          name: "小倉城與小倉城庭園",
          desc: "搭電車回到小倉站，漫步參觀小倉城，欣賞宏偉的古城與日式庭園景色。",
          lat: 33.8841,
          lng: 130.8743,
          iconType: "sightseeing"
        },
        {
          time: "18:30",
          name: "皿倉山百萬夜景 (備選)",
          desc: "(視體力與天氣調整) 搭乘纜車登上皿倉山頂，欣賞被列為「新日本三大夜景」的八幡百萬夜景。",
          lat: 33.8411,
          lng: 130.7933,
          iconType: "sightseeing"
        }
      ]
    },
    {
      dayNum: 3,
      date: "6/29 (一)",
      title: "熊本城歷史與酷MA萌部長相會",
      hotel: "Amistad Hotel Fukuoka",
      spots: [
        {
          time: "08:50",
          name: "搭新幹線前往熊本",
          desc: "從博多車站搭乘新幹線（瑞穗號或櫻花號）前往熊本站，轉乘路面電車。",
          lat: 33.5897,
          lng: 130.4208,
          iconType: "train"
        },
        {
          time: "10:00",
          name: "熊本城天守閣與城彩苑",
          desc: "參觀雄偉的熊本城天守閣，隨後逛櫻之馬場城彩苑，體驗江戶時代風情並享用特色小吃。",
          lat: 32.8062,
          lng: 130.7058,
          iconType: "sightseeing"
        },
        {
          time: "12:00",
          name: "下通商店街午餐與熊本熊部長",
          desc: "於下通商店街享用馬肉料理或拉麵。隨後前往鶴屋百貨的酷MA萌廣場，看可愛的熊本熊部長唱跳表演。",
          lat: 32.8010,
          lng: 130.7090,
          iconType: "restaurant"
        },
        {
          time: "16:00",
          name: "AMU PLAZA 熊本購物與晚餐",
          desc: "回到熊本車站旁的 AMU PLAZA 逛街、採購名產並享用晚餐，隨後搭乘新幹線返回博多休息。",
          lat: 32.7896,
          lng: 130.6894,
          iconType: "shopping"
        }
      ]
    },
    {
      dayNum: 4,
      date: "6/30 (二)",
      title: "長崎一日遊與稻佐山世界級夜景",
      hotel: "Amistad Hotel Fukuoka",
      spots: [
        {
          time: "08:00",
          name: "搭火車前往長崎",
          desc: "搭乘特急接力海鷗號前往武雄溫泉站，同月台轉乘西九州新幹線「海鷗號 (Kamome)」直達長崎車站。",
          lat: 33.5897,
          lng: 130.4208,
          iconType: "train"
        },
        {
          time: "10:30",
          name: "和平公園與原爆資料館",
          desc: "搭路面電車前往和平公園，參拜祈念像，並前往原爆資料館，了解長崎遭受原子彈轟炸的歷史。",
          lat: 32.7742,
          lng: 129.8631,
          iconType: "sightseeing"
        },
        {
          time: "13:00",
          name: "眼鏡橋散步與午餐",
          desc: "前往日本最古老的拱形石橋眼鏡橋散步，在川堤邊尋找愛心石，並於周邊享用午餐。",
          lat: 32.7471,
          lng: 129.8803,
          iconType: "sightseeing"
        },
        {
          time: "17:30",
          name: "稻佐山纜車與夜景",
          desc: "搭乘路面電車轉接駁巴士前往纜車站，乘纜車登上稻佐山山頂，俯瞰「世界新三大夜景」之一的長崎百萬夜景。",
          lat: 32.7428,
          lng: 129.8517,
          iconType: "sightseeing"
        },
        {
          time: "20:00",
          name: "長崎車站晚餐與返回博多",
          desc: "回到長崎車站享用晚餐並購買著名的長崎蛋糕（蜂蜜蛋糕），搭乘新幹線/特急列車返回博多酒店休息。",
          lat: 32.7533,
          lng: 129.8717,
          iconType: "train"
        }
      ]
    },
    {
      dayNum: 5,
      date: "7/1 (三)",
      title: "福岡市區歷史巡禮與天神繁華街",
      hotel: "Richmond Hotel Fukuoka Tenjin",
      spots: [
        {
          time: "09:00",
          name: "退房與寄存行李",
          desc: "從 Amistad 辦理退房，攜帶行李移置天神 Richmond Hotel 寄存，隨後購買「福岡地下鐵一日券」開啟一日遊。",
          lat: 33.5878,
          lng: 130.4005,
          iconType: "hotel"
        },
        {
          time: "10:00",
          name: "櫛田神社與川端通老街",
          desc: "參拜櫛田神社，欣賞巨大的山笠神轎。隨後前往川端通商店街體驗福岡歷史老街風情。",
          lat: 33.5930,
          lng: 130.4106,
          iconType: "sightseeing"
        },
        {
          time: "13:30",
          name: "天神商圈與天神地下街",
          desc: "在繁華的天神商圈及充滿歐風設計的天神地下街逛街、爆買藥妝，逛 Loft 等知名百貨並享用午餐。",
          lat: 33.5902,
          lng: 130.4014,
          iconType: "shopping"
        },
        {
          time: "18:00",
          name: "福岡塔絕美夜景",
          desc: "搭乘巴士前往海濱百道地區，登上福岡塔，欣賞 360 度環繞的海灣日落與博多灣夜景。",
          lat: 33.5932,
          lng: 130.3515,
          iconType: "sightseeing"
        },
        {
          time: "20:30",
          name: "Richmond Hotel 正式入住",
          desc: "返回天神 Richmond Hotel 辦理 Check-in 入住，在飯店周邊享用宵夜並好好休息。",
          lat: 33.5878,
          lng: 130.4005,
          iconType: "hotel"
        }
      ]
    },
    {
      dayNum: 6,
      date: "7/2 (四)",
      title: "太宰府天滿宮與柳川水鄉遊船",
      hotel: "Richmond Hotel Fukuoka Tenjin",
      spots: [
        {
          time: "08:30",
          name: "西鐵天神站出發",
          desc: "持太宰府柳川套票，從西鐵天神站搭乘西鐵電車出發前往太宰府。",
          lat: 33.5900,
          lng: 130.4010,
          iconType: "train"
        },
        {
          time: "09:30",
          name: "太宰府天滿宮參拜",
          desc: "參拜求學問的天滿宮，品嚐現烤的梅枝餅，參觀由隈研吾設計的特色星巴克門市。",
          lat: 33.5215,
          lng: 130.5348,
          iconType: "sightseeing"
        },
        {
          time: "14:00",
          name: "柳川遊船體驗與鰻魚飯",
          desc: "搭電車至西鐵柳川站，體驗約 70 分鐘的護城河遊船，聽船夫吟唱民謠。上岸後享用百年鰻魚飯美食。",
          lat: 33.1610,
          lng: 130.4170,
          iconType: "ferry"
        },
        {
          time: "18:30",
          name: "天神高級黑毛和牛晚餐",
          desc: "返回天神，享用高級和牛燒肉或壽喜燒大餐，為美好的日本之旅進行慶功晚宴。",
          lat: 33.5878,
          lng: 130.4005,
          iconType: "restaurant"
        }
      ]
    },
    {
      dayNum: 7,
      date: "7/3 (五)",
      title: "天神最後爆買與搭機返台",
      hotel: "返家",
      spots: [
        {
          time: "09:30",
          name: "退房與天神最後購物",
          desc: "飯店退房並寄放行李，於天神與博多商圈做最後的藥妝、伴手禮購物衝刺與採購。",
          lat: 33.5878,
          lng: 130.4005,
          iconType: "hotel"
        },
        {
          time: "16:00",
          name: "搭計程車前往福岡機場",
          desc: "返回飯店領取行李，搭乘計程車直達福岡機場國際線航廈辦理登機。",
          lat: 33.5878,
          lng: 130.4005,
          iconType: "taxi"
        },
        {
          time: "19:00",
          name: "搭機返台",
          desc: "搭乘 19:00 班機由福岡機場起飛，預計 20:25 抵達桃園機場第一航廈（航程約 2 小時 25 分鐘）。",
          lat: 33.5859,
          lng: 130.4507,
          iconType: "airport"
        },
        {
          time: "21:00",
          name: "抵台並搭車返家",
          desc: "出關領取行李後，搭車返回林口溫馨的家，結束愉快的暑假日本之旅。",
          lat: 25.0797,
          lng: 121.2342,
          iconType: "taxi"
        }
      ]
    }
  ]
};
