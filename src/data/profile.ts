export interface SocialLink {
  id: "github";
  label: string;
  value: string;
  href: string;
}

export const profile = {
  name: "강선영",
  englishName: "Sunyoung Kang",
  role: "Full-Stack Developer",
  heroRole: "풀스택 개발자",
  location: "서울, 대한민국",
  availability: "현재 새로운 협업 기회를 찾고 있습니다.",
  bio: "사용자 문제를 구조화하고, 작동하는 제품으로 빠르게 연결하는 개발을 지향합니다.",
  socials: [
    {
      id: "github",
      label: "GitHub",
      value: "github.com/ksyee",
      href: "https://github.com/ksyee",
    },
  ] as const satisfies readonly SocialLink[],
};
