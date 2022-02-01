import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePostDTO {

    blogId: Number;

    @IsString()
    @ApiProperty({type: String, default:'제목',description: '글 제목'})
    readonly title: string;

    @IsOptional()
    @IsString()
    @ApiProperty({type: String, default:'설명', description: '글 설명'})
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, default:'본문', description: '글 본문'})
    readonly body: string;

    @IsString()
    @ApiProperty({type: String, default:'작성자', description: '작성자'})
    readonly author: string;
  }