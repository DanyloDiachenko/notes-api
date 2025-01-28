import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { LoginResponseDto } from "./dto/login-response.dto";
import { ProfileResponseDto } from "./dto/profile-response.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: "Login user to get token" })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: "Success",
        type: LoginResponseDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @Post("login")
    @UseGuards(LocalAuthGuard)
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    /* @Post("register")
    async register(@Body() loginDto: LoginDto) {
        return await this.authService.register(loginDto);
    } */

    @ApiOperation({ summary: "Get all user`s information" })
    @ApiResponse({
        status: 200,
        description: "Success",
        type: ProfileResponseDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @Get("profile")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getProfile(@Request() req: any) {
        return this.authService.getProfile(req.user.email);
    }
}
