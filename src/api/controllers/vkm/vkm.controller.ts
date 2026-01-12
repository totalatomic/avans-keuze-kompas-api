import { Controller, Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { VkmService } from "../../../application/service/vkm.service";
import { Public } from "src/domain/common/decorators/public.decorator";

@Controller('vkm')
@ApiTags('VKM')
export class VkmController {
  constructor(private readonly vkmService: VkmService) { }
  @Get('')
  @ApiOperation({ summary: 'Get all VKM records' })
  @ApiParam({ name: 'None', required: false, description: 'No parameters needed' })
  async findAll() {
    return this.vkmService.findAll(); //this one returns all vkm record unmodified
  }
  @Get('GetById/:id')
  @ApiOperation({ summary: 'Get VKM record by ID' })
  @ApiParam({ name: 'id', required: true, description: 'VKM ID' })
  async findById(@Param('id') id: Number) {
    return this.vkmService.findById(id);
  }
  @Get('/homepage')
  @ApiOperation({ summary: 'Get VKM records for homepage' })
  @ApiParam({ name: 'None', required: false, description: 'No parameters needed' })
  async findForHomepage() {
    return this.vkmService.findallsortedbytheme(); //this one returns all vkm record by theme
  }
}