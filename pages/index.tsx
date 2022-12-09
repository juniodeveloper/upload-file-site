import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import styles from '../styles/Home.module.css';

import { message, Upload, UploadProps } from 'antd';
import { useState } from 'react';

const { Dragger } = Upload;



export default function Home() {

  const [url, setUrl] = useState();

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    action: 'https://meuzuks.xyz/file/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setUrl(info.file.response.file_url)
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  return (
    <div className={styles.container}>
      <Dragger className={styles.upload} {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
      {
        url && <span className={styles.url}>{url}</span>
      }
    </div>
  )
}
