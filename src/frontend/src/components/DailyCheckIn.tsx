import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useSubmitDailyCheckIn } from '../hooks/useQueries';
import { QuestImmutable } from '../backend';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader2, Camera, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface DailyCheckInProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quest: QuestImmutable;
}

export default function DailyCheckIn({ open, onOpenChange, quest }: DailyCheckInProps) {
  const { t } = useLanguage();
  const { mutateAsync: submitCheckIn, isPending } = useSubmitDailyCheckIn();

  const [statusText, setStatusText] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const currentDay = quest.dailyCheckIns.length + 1;
  const isFirstDay = currentDay === 1;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t('dailyCheckIn.fileTooLarge'));
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setUploadProgress(0);
  };

  const handleSubmit = async () => {
    if (!statusText.trim() && !photoFile) {
      toast.error(t('dailyCheckIn.requireContent'));
      return;
    }

    try {
      await submitCheckIn({
        questId: quest.questId,
        statusText: statusText.trim(),
        photoFile: photoFile || undefined,
        onProgress: setUploadProgress,
      });
      toast.success(t('dailyCheckIn.submitSuccess'));
      setStatusText('');
      setPhotoFile(null);
      setPhotoPreview(null);
      setUploadProgress(0);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(t('dailyCheckIn.submitError') + ': ' + error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-neon-cyan/30 bg-card/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-neon-cyan flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {t('dailyCheckIn.title')} - {t('dailyCheckIn.day')} {currentDay}
          </DialogTitle>
          <DialogDescription>
            {isFirstDay ? t('dailyCheckIn.firstDayNote') : t('dailyCheckIn.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm font-semibold mb-2">{quest.title}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {t('dailyCheckIn.progress')}: {quest.dailyCheckIns.length} / {Number(quest.completionTarget)}
              </span>
              <span>
                {t('dailyCheckIn.target')}: {Number(quest.completionTarget)} {t('dailyCheckIn.days')}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statusText">{t('dailyCheckIn.statusUpdate')}</Label>
            <Textarea
              id="statusText"
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              placeholder={t('dailyCheckIn.statusPlaceholder')}
              className="min-h-[100px] resize-none"
              disabled={isPending}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {statusText.length} / 500
            </p>
          </div>

          <div className="space-y-2">
            <Label>{t('dailyCheckIn.photo')}</Label>
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-neon-cyan/30"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemovePhoto}
                  disabled={isPending}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neon-cyan/30 rounded-lg cursor-pointer hover:border-neon-cyan/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">{t('dailyCheckIn.uploadPhoto')}</p>
                  <p className="text-xs text-muted-foreground">{t('dailyCheckIn.photoOptional')}</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isPending}
                />
              </label>
            )}
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t('dailyCheckIn.uploading')}</span>
                <span className="text-neon-cyan font-semibold">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {t('deposit.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || (!statusText.trim() && !photoFile)}
            className="w-full sm:w-auto bg-neon-cyan text-black hover:bg-neon-cyan/90 font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('dailyCheckIn.submitting')}
              </>
            ) : (
              t('dailyCheckIn.submit')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
