import { SvgIcon } from '@mui/material'
import { boardService } from '../services/board'
import { useState } from 'react'
import { makeId } from '../services/util.service'

export function CoverPicker({
  onUpdated,
  setIsPopoverOpen,
  handlePopoverClick,
  setCurrCover,
  currCover,
  task,
  // setNewCover,
}) {
  const coverColors = boardService.getColorsCover()
  const coverImgs = boardService.getImgs()
  const [attachments, setAttachments] = useState(task?.attachments || [])

  function handleCoverSelection(ev, color, img) {
    ev.stopPropagation()

    const updateColor = { ...currCover, color: color, img: img }
    onUpdated('cover', updateColor)
    setCurrCover(updateColor)
    // setNewCover(updateColor);
  }

  function onUploadCover(ev) {
    ev.stopPropagation()
    console.log('upload cover')
  }

  function handleSelectAtt(ev, img) {
    ev.stopPropagation()
    setCurrCover({ ...currCover, color: '#f2e6cc', img: img })
    onUpdated('cover', { ...currCover, color: '#f2e6cc', img: img })
  }

  async function handleSelectFile(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    console.log('currCover:', currCover)
    const file = ev.target.files[0]
    try {
      const res = await boardService.uploadImageToCloud(file)
      console.log('res:', res)
      console.log('attachments:', attachments)
      const id = makeId()

      // const updateFile = { ...currCover, color: '#f2e6cc', img: res.secure_url }
      setAttachments([...attachments, { id: id, name: file.name, url: res.secure_url }])
      onUpdated('attachments', [
        ...attachments,
        { id: id, name: file.name, url: res.secure_url },
      ])
      console.log('task.attachments:', task.attachments)
    } catch (err) {
      console.log('err:', err)
    }
  }

  return (
    <div className='cover-picker-container'>
      <button className='close-cover-btn' onClick={() => setIsPopoverOpen(false)}>
        <SvgIcon iconName='close' />
      </button>
      <div className='cover-picker-header'>
        <span className='cover-picker-title'>Cover</span>
      </div>

      {currCover.color || currCover.img ? (
        <button
          className='remove-cover-btn'
          onClick={ev => handleCoverSelection(ev, '', '')}>
          Remove cover
        </button>
      ) : null}

      <div className='cover-colors-section'>
        <span className='section-title'>Colors</span>
        <ul className='cover-colors-list'>
          {coverColors.map(coverColor => (
            <li key={coverColor.color} className='cover-color-item'>
              <div
                className='cover-color'
                style={{ backgroundColor: coverColor.color }}
                onClick={event =>
                  handleCoverSelection(event, coverColor.color, '')
                }></div>
            </li>
          ))}
        </ul>
      </div>

      <div className='attachment-imgs-section'>
        <span className='section-title'>Attachment photos</span>
        <ul className='attachment-imgs-list'>
          {attachments &&
            attachments.length > 0 &&
            attachments.map(attachment => (
              <li
                key={makeId()}
                className='attachment-img-item'
                onClick={ev => handleSelectAtt(ev, attachment.url)}>
                <img
                  src={attachment.url}
                  alt={attachment.name}
                  className='attachment-img-thumbnail'
                />
              </li>
            ))}
        </ul>
      </div>

      <div className='upload-cover'>
        <label className='upload-cover-btn' onClick={onUploadCover}>
          <input type='file' onChange={handleSelectFile} hidden />
          Upload photo
        </label>
      </div>

      <div className='cover-images-section'>
        <span className='section-title'>Photos</span>
        <ul className='cover-images-list'>
          {coverImgs.map(coverImg => (
            <li key={coverImg.alt} className='cover-img-item'>
              <div
                className='cover-img'
                onClick={event =>
                  handleCoverSelection(event, coverImg.color, coverImg.src)
                }>
                <img
                  src={coverImg.src}
                  alt={coverImg.alt}
                  className='cover-img-thumbnail'
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
