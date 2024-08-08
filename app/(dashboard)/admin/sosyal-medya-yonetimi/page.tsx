import { getSocialMedia, addSocialMedia } from '@/actions/social.actions';
import SocialMediaForm from './SocialMediaForm';

export default async function SocialMediaManagement() {
  const socialMediaPlatforms = [
    { value: 'instagram', label: 'Instagram', icon: 'instagram' },
    { value: 'facebook', label: 'Facebook', icon: 'facebook' },
    { value: 'x', label: 'X', icon: 'x' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
    { value: 'youtube', label: 'YouTube', icon: 'youtube' },
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