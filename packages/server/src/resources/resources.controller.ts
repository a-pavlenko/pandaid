import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { ResourcesResponse, CreateRequestRequest } from '@shared/resources.dto'
import { Role } from '@shared/users.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { ResourcesService } from './resources.service'

@ApiBearerAuth()
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  @ApiResponse({ status: 200, type: ResourcesResponse })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.VOLUNTEER)
  public searchResources(@Query('query') query): ResourcesResponse {
    return {
      list: this.resourcesService.getResources(),
    }
  }

  @Post()
  @HttpCode(204)
  public create(@Body() createRequestRequest: CreateRequestRequest) {
    return { id: 3 }
  }
}
