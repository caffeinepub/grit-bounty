import { useLanguage } from '../hooks/useLanguage';
import { useDeleteQuest } from '../hooks/useQueries';
import { QuestImmutable } from '../backend';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

interface DeleteQuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quest: QuestImmutable | null;
}

export default function DeleteQuestDialog({ open, onOpenChange, quest }: DeleteQuestDialogProps) {
  const { t } = useLanguage();
  const deleteQuestMutation = useDeleteQuest();

  if (!quest) return null;

  console.log('[DeleteQuestDialog] Rendered with quest:', quest.questId.toString());

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('[DeleteQuestDialog] Confirm clicked for questId:', quest.questId.toString());
    
    try {
      console.log('[DeleteQuestDialog] Calling deleteQuest mutation...');
      await deleteQuestMutation.mutateAsync(quest.questId);
      console.log('[DeleteQuestDialog] Delete successful, closing dialog');
      onOpenChange(false);
    } catch (error) {
      console.error('[DeleteQuestDialog] Delete quest error:', error);
    }
  };

  const isDeleting = deleteQuestMutation.isPending;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-red-500/30 bg-card/95 backdrop-blur">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-400">
            {t('deleteQuest.title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p className="text-muted-foreground">
              {t('deleteQuest.description')}
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 space-y-2">
              <p className="font-semibold text-foreground">{quest.title}</p>
              <p className="text-sm text-muted-foreground">
                {t('deleteQuest.warning')}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t('deleteQuest.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('deleteQuest.deleting')}
              </>
            ) : (
              t('deleteQuest.confirm')
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
