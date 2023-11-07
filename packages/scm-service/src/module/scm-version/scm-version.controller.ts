import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScmVersionService } from './scm-version.service';
import { CreateScmVersionDto } from './dto/create-scm-version.dto';
import { UpdateScmVersionDto } from './dto/update-scm-version.dto';

@Controller('scm-version')
export class ScmVersionController {
  constructor(private readonly scmVersionService: ScmVersionService) {}

  @Post()
  create(@Body() createScmVersionDto: CreateScmVersionDto) {
    return this.scmVersionService.create(createScmVersionDto);
  }

  @Get()
  findAll() {
    return this.scmVersionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scmVersionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScmVersionDto: UpdateScmVersionDto) {
    return this.scmVersionService.update(+id, updateScmVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scmVersionService.remove(+id);
  }
}
