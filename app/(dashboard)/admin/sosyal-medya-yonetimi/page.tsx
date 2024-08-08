import { getSocialMedia, addSocialMedia } from '@/actions/social.actions';
import SocialMediaForm from './SocialMediaForm';
import { InstagramLogo, FacebookLogo, TwitterLogo, LinkedinLogo, YoutubeLogo } from '@phosphor-icons/react/dist/ssr';
import { IconProps } from '@phosphor-icons/react';

type Platform = {
  value: string;
  label: string;
  icon: React.ForwardRefExoticComponent<IconProps>;
};
export default async function SocialMediaManagement() {
  const socialMediaPlatforms: Platform[] = [
    { value: 'instagram', label: 'Instagram', icon: InstagramLogo },
    { value: 'facebook', label: 'Facebook', icon: FacebookLogo },
    { value: 'x', label: 'X', icon: TwitterLogo },
    { value: 'linkedin', label: 'LinkedIn', icon: LinkedinLogo },
    { value: 'youtube', label: 'YouTube', icon: YoutubeLogo },
  ];

  const existingSocialMedia = await getSocialMedia();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sosyal Medya Yönetimi</h1>
      <SocialMediaForm 
        platforms={socialMediaPlatforms} 
        existingSocialMedia={existingSocialMedia} 
        onSubmit={addSocialMedia} 
      />

    </div>
  );
}