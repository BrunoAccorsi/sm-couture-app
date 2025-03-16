import { ImageSourcePropType } from 'react-native';

export interface AboutSectionContent {
  imageUrl: ImageSourcePropType;
  text: string;
  title: string;
}

export const aboutContent: AboutSectionContent[] = [
  {
    imageUrl: require('@/assets/images/about/sm-couture-sharifa-1.jpg'),
    title: 'Professional Background',
    text: "Sharifa is a mother of six and grandmother of two, and a Licensed Independent Financial Service Professional. She is dedicated to helping individuals create generational wealth, build legacies, and prepare for retirement, with a strong focus on financial literacy—a crucial area many people find lacking. Specializing in insurance, investments, and pensions, Sharifa's mission is to educate 1 million people on financial literacy by 2030.",
  },
  {
    imageUrl: require('@/assets/images/about/philanthropy.jpg'),
    title: 'Philanthropy & Leadership',
    text: "Sharifa has devoted her life to improving the lives of others by offering a range of products and services. She is actively involved in several non-profit ventures and has spent years pursuing her philanthropic goals, particularly supporting women's professional and personal development. As a Senior Executive spearheading the Resilient Woman Program, she works to educate, empower, and inspire women and girls—especially those who have experienced trauma from physical, sexual, mental, and financial hardships—into leadership roles within their communities and careers. As a certified coach with over 25 years of experience in customer service, Sharifa has led high-performing teams and launched The Customer Experience Architect, a consulting business specializing in improving customer interactions in call centers, contact centers and brick & mortar businesses.",
  },
  {
    imageUrl: require('@/assets/images/about/sm-couture-sharifa-2.jpeg'),
    title: 'S&M Couture & Media',
    text: 'As the founder of S&M Couture, Sharifa combines her passion for fashion with her unique eye for clothing and shoes, making her a sought-after personal shopper and designer for fashion enthusiasts who want to stand out. She is also recognized as a business strategist and red-carpet host, having worked at prestigious events such as the Meet The Motivators Gala and Colors of Love International Concert. Sharifa has been featured on radio stations including NewsTalk 1010, Flow 98.7, and AM 820, as well as on television programs such as CP24, The Ordinary People Show on Rogers, and The Nikki Clarke Show.',
  },
  {
    imageUrl: require('@/assets/images/about/mentor.jpg'),
    title: 'Personal Philosophy',
    text: 'Sharifa thrives on helping people navigate life, drawing from her own experiences with the belief that "my life will be a testimony without the accompanying pain." She often says, "I have done the hard work in life for everyone so they don\'t have to climb the mountain; they can just open the door and step into the rooms I have access to and gain the knowledge they need to navigate life successfully."',
  },
];
