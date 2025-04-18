
import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { RolesDecorator } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/auth/enum/roles.enum';
import { AuthorizaitonGuard } from 'src/authorizaiton/authorizaiton.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@RolesDecorator(Roles.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(AuthorizaitonGuard)
@Controller('file')
export class MulterController {
    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                callback(null, `${Math.random()}-${file.originalname}`)
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {url: file.filename}
    }
}
