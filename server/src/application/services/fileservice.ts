import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

export class FileService {
  async processUserProfileImage(fileBuffer: Buffer): Promise<string> {
    const img = await sharp(fileBuffer).resize(400, 400, { fit: 'cover' }).webp({ quality: 50 }).toBuffer();

    const fileName = `${uuidv4()}_profile_400x400.webp`;
    const filePath = path.join(process.cwd(), 'public/users-img/', fileName);

    await this.processLqUserProfileImage(fileName, fileBuffer);

    await fs.writeFile(filePath, img);
    return fileName;
  }

  private async processLqUserProfileImage(fileName: string, fileBuffer: Buffer): Promise<string> {
    const img = await sharp(fileBuffer).resize(400, 400, { fit: 'cover' }).webp({ quality: 10 }).toBuffer();

    const filePath = path.join(process.cwd(), 'public/users-img/', fileName.replace('400x400', '400x400_low'));

    await fs.writeFile(filePath, img);
    return fileName;
  }

  async downloadImageAsBuffer(imageUrl: string): Promise<Buffer> {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error: any) {
      throw new Error(`Failed to download image: ${error.message}`);
    }
  }

  async deleteImageByFileName(fileName: string) {
    const filePath = path.join(process.cwd(), 'public/users-img/', fileName);

    await fs.unlink(filePath);
  }
}
