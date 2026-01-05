import { Controller, Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { VkmService } from "../../../application/vkm/vkm.service";

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
  @Get('/homepage')
  @ApiOperation({ summary: 'Get VKM records for homepage' })
  @ApiParam({ name: 'None', required: false, description: 'No parameters needed' })
  async findForHomepage() {
    return this.vkmService.findallsortedbytheme(); //this one returns all vkm record by theme
  }
}