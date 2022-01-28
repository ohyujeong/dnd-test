import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete, Patch } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
import { ApiTags, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiCreatedResponse, ApiParam, ApiProperty } from '@nestjs/swagger';

@ApiTags('blog')
@Controller('blog')
export class BlogController {

    constructor(private blogService: BlogService) { }

    // Submit a post
    @Post('/post')
    @ApiResponse({ description: '글 작성 API' })
    @ApiBody({ type: CreatePostDTO })
    @ApiCreatedResponse({
        description: '글 작성 성공 여부', schema: {
            example: { success: true }
        }
    })
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.CREATED).json(newPost);
    }

    @Get('post/:blogId')
    @ApiResponse({ description: '특정 글 조회 API' })
    async getPost(@Res() res, @Param('blogId') blogId: Number) {
        const post = await this.blogService.getPost(blogId);
        if (!post) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json(post);
    }

    @Get('posts')
    @ApiResponse({ description: '전체 글 조회 API' })
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    @Patch('/edit/:blogId')
    @ApiResponse({ description: '특정 글 수정 API' })
    @ApiBody({ type: CreatePostDTO })
    async editPost(
        @Res() res,
        @Param('blogId') blogId: Number,
        @Body() updatePostDTO: UpdatePostDTO
    ) {
        const editedPost = await this.blogService.editPost(blogId, updatePostDTO);
        if (!editedPost) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost,
        });
    }

    // Delete a post using ID
    @Delete('/delete/:blogId')
    async deletePost(@Res() res, @Param('blogId') blogId: Number,) {
        const deletedPost = await this.blogService.deletePost(blogId);
        if (!deletedPost) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost,
        });
    }
}