import { Modal } from '../common/Modal'
import { useModal } from '../../context/ModalContext'

export function ModerationModal() {
  const { modal, closeModal, finishModeration } = useModal()
  const open = modal === 'moderation'

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title="بررسی Moderator هوش مصنوعی"
      size="sm"
      footer={
        <>
          <span style={{ fontSize: 9, color: 'var(--muted)' }}>در موارد مبهم، پیام به صف بررسی انسانی می‌رود.</span>
          <button type="button" className="btn btn-primary" onClick={finishModeration}>
            مشاهده ایده منتشرشده
          </button>
        </>
      }
    >
      <div className="moderation-progress">
        <div className="moderation-step">
          <i className="step-icon">✓</i>
          <div>
            <strong>بررسی محتوای پیام</strong>
            <span>مغایرتی با قواعد انتشار پیدا نشد.</span>
          </div>
        </div>
        <div className="moderation-step">
          <i className="step-icon">#</i>
          <div>
            <strong>دسته‌بندی و تگ‌گذاری</strong>
            <span>تگ‌های پیشنهادی: سفارش‌گذاری، تجربه کاربری، خطای سفارش</span>
          </div>
        </div>
        <div className="moderation-step">
          <i className="step-icon">AI</i>
          <div>
            <strong>ساخت عنوان و خلاصه</strong>
            <span>متن برای انتشار خواناتر و کوتاه‌تر شد.</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
