import React, {useState} from 'react'
import {Modal, Button} from 'carbon-components-react'
import classes from './image-preview-component.scss'
import {ImagePreviewComponentProps} from '../../types'

const ImagePreviewComponent = ({
  url,
  fileName,
  auditMessage,
  postAuditMessage,
}: ImagePreviewComponentProps) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button
        className={classes.imageLabel}
        role="button"
        kind="ghost"
        onClick={() => {
          setShowModal(true)
          postAuditMessage(auditMessage)
        }}
      >
        {fileName}
      </Button>
      <div>
        <Modal
          className={classes.modal}
          modalHeading={fileName}
          modalAriaLabel={fileName}
          passiveModal={true}
          open={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <img className={classes.image} src={url} alt={fileName}></img>
        </Modal>
      </div>
    </>
  )
}
export default ImagePreviewComponent
