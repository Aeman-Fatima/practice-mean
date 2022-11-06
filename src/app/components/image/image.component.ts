import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../../services/image-upload.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  loading: boolean = false
  imageObj!: File | null | undefined;
  imageUrl!: string;
  fileUrl!: string;

  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
  }


  onImagePicked(event: Event): void {
    const target = event?.target as HTMLInputElement
    this.imageObj = target.files?.item(0);
    console.log(this.imageObj)
  }

  onImageUpload() {
    this.loading = true
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj || '');
    this.imageUploadService.imageUpload(imageForm).subscribe((data) => {
      console.log(data)
      if (this.isImage(data.response.image))
        this.imageUrl = data.response.image;
      else this.fileUrl = data.response.image
      this.loading = false
    }, err => console.log(err));
  }

  isImage(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }



}
