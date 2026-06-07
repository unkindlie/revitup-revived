import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ExposingSerialization } from 'common/decorators/exposing-serialization.decorator';
import { imageFileFilter } from 'common/file-upload/image-file.filter';
import { PaginatedQuery } from 'common/types/pagination.type';
import { ValidatedArray } from 'common/types/validated-array.type';

import { UserShortDto, UserUpdateDto } from 'features/user/dto';
import { UserService } from 'features/user/user.service';
import { UserImageService } from '../user-images/user-image.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserPayloadDto } from '../auth/dto';
import { UserFavDriverDto } from './dto/user-fav-driver.dto';

@Controller('users')
export class UserController {
  constructor(
    private service: UserService,
    private userImageService: UserImageService,
  ) {}

  @Get()
  @ExposingSerialization(ValidatedArray({ users: UserShortDto }))
  async getUsers(@Query() query: PaginatedQuery) {
    const [users, count] = await this.service.getUsers();

    return { users, count, query };
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getUserById(id);
  }

  @Post('profile-images')
  async getUserImages(@Body('id', ParseIntPipe) id: number) {
    return await this.userImageService.getUserImages(id);
  }

  // TODO: add caching
  @Get('pfp/:id')
  async getUserImageById(@Param('id', ParseIntPipe) id: number) {
    return await this.userImageService.getLatestUserImage(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('favourite-driver')
  setFavouriteDriver(
    @CurrentUser() user: UserPayloadDto,
    @Body() body: UserFavDriverDto,
  ) {
    return this.service.setFavouriteDriver(user.id, body.driverId);
  }

  @Post('upload-pfp')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
    }),
  )
  async uploadUserImage(
    @CurrentUser() user: UserPayloadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.userImageService.uploadUserImage(file, user.id);

    await this.service.updateUserInfo({ id: user.id, profileImgUrl: url });

    return { message: 'User profile image uploaded' };
  }

  @Delete('pfp/:imageId')
  @UseGuards(AccessTokenGuard)
  async deleteUserImage(
    @CurrentUser() user: UserPayloadDto,
    @Param('imageId') imageId: string,
  ) {
    await this.userImageService.deleteUserImage(user.id, imageId);

    const latest = await this.userImageService.getLatestUserImage(user.id);
    await this.service.updateUserInfo({
      id: user.id,
      profileImgUrl: latest || undefined,
    });

    return { message: 'User profile image deleted' };
  }

  @Patch('update-profile')
  async updateInfo(@Body() body: UserUpdateDto) {
    await this.service.updateUserInfo(body);

    return { message: 'User profile successfully updated' };
  }

  @Delete('delete-profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Body('userId', ParseIntPipe) id: number) {
    await this.service.deleteUser(id);
  }
}
